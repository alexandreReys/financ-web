export default class Login {
  constructor(obj = {}) {
    this.id = obj.Id || "";
    this.email = obj.email || "";
    this.password = obj.password || "";
    this.name = obj.name || "";
    this.idEmpresaUsuario = obj.idEmpresaUsuario || "";
  }
}

export const getJsonApiLogin = () => {
  return {
    Id: this.ID,
    email: this.email,
    password: this.password,
    name: this.name,
    idEmpresaUsuario: this.idEmpresaUsuario,
  };
};
