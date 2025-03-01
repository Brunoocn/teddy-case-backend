export class LoginResponseDTO {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
