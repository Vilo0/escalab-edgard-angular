export class ModelUsuario {

    constructor(
      public _id: string,
      public nombre: string,
      public apellido?: string,
      public telefono?: string,
      public role?: 'ADMIN_ROLE' | 'USER_ROLE',
      public email?: string,
      public password?: string,
    ) { }
  
  }