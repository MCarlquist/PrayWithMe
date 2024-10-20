import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment.prod';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  name: string = '';
  email: string = '';

  @ViewChild(IonModal) modal: IonModal | undefined;
  
  constructor() { }

  ngOnInit() {
    const supabase = createClient(environment.SupabaseUrl, environment.SupabaseAcessKey);
    
    
  }

  onDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    
    if(ev.detail.role === 'confirm') {
      console.log('data', ev.detail.data);
      
    }
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
    this.name = '';
    this.email = '';
  }

  confirm() {
    console.log(this.email);
    console.log(this.name);
    this.modal?.dismiss({email: this.email, name: this.name}, 'confirm');
  }

}
