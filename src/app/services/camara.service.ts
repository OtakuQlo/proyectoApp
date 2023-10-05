import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  public foto: any;

  constructor() {}

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    this.foto = image.dataUrl;
  };
}
