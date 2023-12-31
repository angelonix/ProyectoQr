import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public alertController: AlertController
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      'password': new FormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)])
    });
  }

  ngOnInit() {}

  async ingresar() {
    if (this.formularioLogin.valid) {
      const f = this.formularioLogin.value;
      const usuariosJSON = await Preferences.get({ key: 'usuarios'});
      const usuarios: { nombre: string, password: string} [] = usuariosJSON && usuariosJSON.value ? JSON.parse(usuariosJSON.value) : [];
      const user = usuarios.find((u: any) => u.usuario === f.nombre && u.password === f.password);

      if (user) {
        await Preferences.set({ key: 'nombreUsuario', value: user.nombre });
        await Preferences.set({ key: 'usuario', value: JSON.stringify(usuarios) });
        console.log("Sesión iniciada");
        localStorage.setItem("Sesión iniciada", "true"); 
        this.router.navigate(['/home']);
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Algun Dato es Incorrecto.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Complete todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}
