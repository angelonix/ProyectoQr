import { Component, OnInit } from '@angular/core';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-registros-clases',
  templateUrl: './registros-clases.page.html',
  styleUrls: ['./registros-clases.page.scss'],
})
export class RegistrosClasesPage implements OnInit {
  mensajeDesdePreferences: string | null = '';
  latitude: number | undefined;
  longitude: number | undefined;
  horaDesdePreferences: string | null = '';
  usuarios: any[] = [];
  imageSrc: string = '';

  constructor() { }

  ngOnInit() {
    this.getCurrentPosition();
    this.retrieveMessageFromPreferences();
    this.retrieveUsuariosFromPreferences();
    this.retrieveHoraFromPreferences();
  }
  
  async getCurrentPosition() {
    try {
      const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
    } catch (error) {
      console.error('Error al obtener la posición actual:', (error as Error).message);
    }
  }

  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      if (image && image.webPath) {
        this.imageSrc = image.webPath;
      } else {
        console.log('No se capturó ninguna imagen o la imagen es nula.');
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', (error as Error).message);
    }
  }

  async retrieveMessageFromPreferences() {
    try {
      const mensaje = await Preferences.get({ key: 'mensaje' });
      if (mensaje && mensaje.value) {
        this.mensajeDesdePreferences = this.agregarSaltosDeLinea(mensaje.value);
        console.log("Mensaje recuperado:", mensaje);
      }
    } catch (error) {
      console.error('Error al recuperar el mensaje:', (error as Error).message);
    }
  }

  async retrieveUsuariosFromPreferences() {
    try {
      const usuariosJSON = await Preferences.get({ key: 'usuarios' });
      if (usuariosJSON && usuariosJSON.value) {
        this.usuarios = JSON.parse(usuariosJSON.value);
      }
    } catch (error) {
      console.error('Error al recuperar usuarios:', (error as Error).message);
    }
  }

  async retrieveHoraFromPreferences() {
    try {
      const hora = await Preferences.get({ key: 'hora' });
      if (hora && hora.value) {
        this.horaDesdePreferences = hora.value;
      }
    } catch (error) {
      console.error('Error al recuperar la hora:', (error as Error).message);
    }
  }

  agregarSaltosDeLinea(mensaje: string) {
    return mensaje.replace(/,/g, '<br>');
  }
}
