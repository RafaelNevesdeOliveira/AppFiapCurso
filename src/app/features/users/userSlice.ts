import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, addUser, fetchUsers } from '../../service/userService';

// Definição do estado inicial da aplicação relacionado aos usuários
interface UserState {
  users: User[];           // Lista de usuários
  loading: boolean;        // Indicador de carregamento (true durante requisições assíncronas)
  error: string | null;    // Mensagem de erro em caso de falha
}

// Estado inicial para a slice de usuários
const initialState: UserState = {
  users: [],               // Inicialmente, a lista de usuários está vazia
  loading: false,          // Nenhuma operação de carregamento está em andamento
  error: null,             // Não há erros iniciais
};

// Função assíncrona para registrar um usuário, utilizando createAsyncThunk
export const registerUserAsync = createAsyncThunk(
  'users/registerUser',    // Nome da ação
  async (user: Omit<User, 'id'>) => {  // Função assíncrona que recebe os dados do usuário, exceto o 'id'
    return await addUser(user);        // Chama o serviço addUser para registrar o usuário e retorna a resposta
  }
);

// Função assíncrona para buscar a lista de usuários, utilizando createAsyncThunk
export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',      // Nome da ação
  async () => {            // Função assíncrona que busca a lista de usuários
    return await fetchUsers();  // Chama o serviço fetchUsers para obter os usuários e retorna a resposta
  }
);

// Criação da slice de usuários com createSlice
const userSlice = createSlice({
  name: 'users',           // Nome da slice
  initialState,            // Estado inicial definido anteriormente
  reducers: {},            // Não há reducers síncronos personalizados neste caso
  extraReducers: (builder) => {  // Definição dos casos para ações assíncronas
    builder
      // Caso de quando a ação registerUserAsync está pendente (requisição iniciada)
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;   // Indica que o carregamento está em andamento
        state.error = null;     // Reseta o erro
      })
      // Caso de quando a ação registerUserAsync é concluída com sucesso
      .addCase(registerUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;  // Carregamento concluído
        state.users.push(action.payload);  // Adiciona o novo usuário à lista de usuários
      })
      // Caso de quando a ação registerUserAsync falha
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;  // Carregamento concluído, mas com erro
        state.error = action.error.message || 'Failed to register user';  // Define a mensagem de erro
      })
      // Caso de quando a ação fetchUsersAsync está pendente (requisição iniciada)
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;   // Indica que o carregamento está em andamento
        state.error = null;     // Reseta o erro
      })
      // Caso de quando a ação fetchUsersAsync é concluída com sucesso
      .addCase(fetchUsersAsync.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;  // Carregamento concluído
        state.users = action.payload;  // Atualiza a lista de usuários com os dados obtidos
      })
      // Caso de quando a ação fetchUsersAsync falha
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;  // Carregamento concluído, mas com erro
        state.error = action.error.message || 'Failed to fetch users';  // Define a mensagem de erro
      });
  },
});

// Exporta o reducer gerado pela slice para ser usado na store Redux
export default userSlice.reducer;
