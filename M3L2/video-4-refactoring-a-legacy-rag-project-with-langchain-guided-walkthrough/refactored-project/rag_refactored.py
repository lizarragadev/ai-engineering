"""Pipeline RAG refactorizado usando abstracciones de LangChain."""

import os
from dotenv import load_dotenv
load_dotenv()

from langchain import OpenAI, PromptTemplate, LLMChain
from langchain.embeddings import OpenAIEmbeddings
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.agents import initialize_agent, AgentType, Tool

# Configurar entorno
llm = OpenAI(temperature=0, openai_api_key=os.getenv('OPENAI_API_KEY'))
embeddings = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))

# Extracción de PromptTemplate
prompt = PromptTemplate(
    input_variables=['question', 'context'],
    template='Contexto: {context}\nPregunta: {question}'
)

# Composición de Chain
chain = LLMChain(llm=llm, prompt=prompt)

# Modularización de índice
loader = TextLoader('sample-data/doc1.txt')
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
docs = splitter.split_documents(docs)
vectorstore = FAISS.from_documents(docs, embeddings)

# Integración de agente
tools = [
    Tool(
        name='Búsqueda',
        func=lambda q: vectorstore.similarity_search(q, k=3),
        description='Útil para buscar documentos.'
    )
]
agent = initialize_agent(tools, llm, agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

if __name__ == '__main__':
    result = agent.run('¿Qué es LangChain?')
    print(result)
