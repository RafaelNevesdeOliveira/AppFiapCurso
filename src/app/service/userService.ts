import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Definição da interface User que descreve o formato de um objeto usuário
export interface User {
  id: string;   // ID único do usuário no Firestore
  name: string; // Nome do usuário
  email: string; // Email do usuário
}

// Criação de uma referência à coleção 'users' no Firestore
const userCollection = collection(db, 'users');

// Função assíncrona para adicionar um novo usuário à coleção 'users'
export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  try {
    // Adiciona o usuário à coleção e obtém a referência do documento criado
    const docRef = await addDoc(userCollection, user);
    // Retorna o usuário com o ID gerado pelo Firestore
    return { ...user, id: docRef.id };
  } catch (e) {
    console.error("Erro ao adicionar usuário: ", e);
    throw new Error("Failed to add user");
  }
};

// Função assíncrona para buscar todos os usuários da coleção 'users'
export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Obtém todos os documentos da coleção 'users'
    const querySnapshot = await getDocs(userCollection);
    // Mapeia os documentos para objetos User e retorna como uma lista
    return querySnapshot.docs.map(doc => ({
      id: doc.id,         // ID do documento no Firestore
      ...doc.data(),      // Os dados do documento (name, email)
    })) as User[];
  } catch (e) {
    console.error("Erro ao buscar usuários: ", e);
    return [];
  }
};
