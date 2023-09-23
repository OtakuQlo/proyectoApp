import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  constructor() { }

    takePicture = async () => {
      const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl

    });
    return image.dataUrl;
   
  };
}
