import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../service/login/user.service';
import { Router } from '@angular/router';
import { UserDto } from 'src/model/UserDto';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  providers: [MessageService]
})
export class LoginUserComponent {

  userEntry!: UserDto;

  username!: string;

  password!: string;

  response: number = 0;

  constructor(private messageService: MessageService, private userService: UserService, private router: Router) {

  }

  async login() {
    if (this.username !== undefined && this.password !== undefined) {

      this.userEntry = { username: this.username, password: this.password };

      try {
        await this.userService.login({ username: this.username, password: this.password }).then((data) => {
          this.response = data.status;
        })

      } catch (error) {

      }

      if (this.response === 202) {

        this.messageService.add(
          {
            severity: 'success',
            summary: 'Exito', detail:
              'Ha ingresado al sistema'
          });


        this.router.navigate(['home']);
        
      }else{
        this.messageService.add(
          {
            severity: 'warn',
            summary: 'Advertencia', detail:
              'Contraseña o usuario incorrectos'
          });
      }

    } else {
      this.messageService.add(
        {
          severity: 'warn',
          summary: 'Advertencia', detail:
            'Ingrese usuario y contraseña'
        });
    }
  }


}
