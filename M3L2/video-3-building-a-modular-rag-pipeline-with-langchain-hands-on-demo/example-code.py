"""Demo práctica: Construcción de un pipeline RAG modular con LangChain."""

import os
from dotenv import load_dotenv
load_dotenv()

from langchain import OpenAI, PromptTemplate, LLMChain
from langchain.embeddings import OpenAIEmbeddings
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.agents import initialize_agent, AgentType, Tool

# Paso 1: Configurar LLM y embeddings
llm = OpenAI(temperature=0, openai_api_key=os.getenv('OPENAI_API_KEY'))
embeddings = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))

# Paso 2: Crear plantilla de prompt
prompt = PromptTemplate(
    input_variables=['question', 'context'],
    template='Contexto: {context}\nPregunta: {question}'
)

# Paso 3: Construir una cadena simple
chain = LLMChain(llm=llm, prompt=prompt)

# Paso 4: Cargar y dividir documentos
loader = TextLoader('sample-data/doc1.txt')
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
docs = splitter.split_documents(docs)

# Paso 5: Crear almacén vectorial FAISS
vectorstore = FAISS.from_documents(docs, embeddings)

# Paso 6: Definir herramientas para el agente
tools = [
    Tool(
        name='Búsqueda',
        func=lambda q: vectorstore.similarity_search(q, k=3),
        description='Útil para buscar documentos.'
    )
]

# Paso 7: Inicializar y ejecutar agente
agent = initialize_agent(tools, llm, agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

if __name__ == '__main__':
    result = agent.run('¿Qué es LangChain?')
    print(result)
