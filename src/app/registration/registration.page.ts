import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment.prod';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  password: string = '';
  email: string = '';

  @ViewChild(IonModal) modal: IonModal | undefined;

  constructor(private alertCtl: AlertController) { }

  ngOnInit() {

  }

  onDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    if (ev.detail.role === 'confirm') {
      console.log('data', ev.detail.data);

    }
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
    this.password = '';
    this.email = '';
  }

  async confirm() {
    const supabase = createClient(environment.SupabaseUrl, environment.SupabaseAcessKey);
    const { data, error } = await supabase.auth.signUp({
      email: this.email,
      password: this.password,
    });

    if (error || (this.email === '' || this.password === '')) {

      const alert = await this.alertCtl.create({
        header: 'Oops, Something went wrong',
        message: 'Please check again that everything is correct',
        buttons: ['Close'],
      });

      await alert.present();

    } else {
      this.modal?.dismiss({ email: this.email, password: this.password }, 'confirm');
    }
  }

  async signIn() {
    const supabase = createClient(environment.SupabaseUrl, environment.SupabaseAcessKey);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (error || (this.email === '' || this.password === '')) {

      const alert = await this.alertCtl.create({
        header: 'Oops, Something went wrong',
        message: 'Please check again that everything is correct',
        buttons: ['Close'],
      });

      await alert.present();

    } else {
      this.modal?.dismiss({ email: this.email, password: this.password }, 'confirm');
      console.log(data);
      
    }

  }


}
