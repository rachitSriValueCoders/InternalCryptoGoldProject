import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	authSuccess: String;

  constructor(public navCtrl: NavController, private androidFingerprintAuth: AndroidFingerprintAuth) {
  	this.authSuccess = 'here';
  	this.androidFingerprintAuth.isAvailable()
		  .then((result)=> {
		    if(result.isAvailable){
		      // it is available

		      this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
		        .then(result => {
		           if (result.withFingerprint) {
		           		this.authSuccess = result.token;
		               console.log('Successfully encrypted credentials.');
		               console.log('Encrypted credentials: ' + result.token);
		           } else if (result.withBackup) {
		             console.log('Successfully authenticated with backup password!');
		           } else {
		           		this.authSuccess = 'Didn\'t authenticate!';
		           	console.log('Didn\'t authenticate!');
		           }
		        })
		        .catch(error => {
		           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
		           	this.authSuccess = 'Fingerprint authentication cancelled';
		             console.log('Fingerprint authentication cancelled');
		           } else console.error(error)
		        });

		    } else {
		      // fingerprint auth isn't available
		    }
		  })
		  .catch(error => console.error(error));
  }

}
