import {Component} from 'angular2/core';
import {NgForm, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Router} from 'angular2/router';

import { ApplicationService } from '../../services/application/application.service';
import { CredentialService } from '../../services/credential/credential.service';


@Component({
		selector: 'add-volume-setup-form',
		providers: [ ApplicationService, CredentialService ],
		template: require('./add-volume-setup-form.component.html')
})
export class AddVolumeSetupForm {

		volumeSetupForm: ControlGroup;

		constructor(
			fb: FormBuilder,
			public router: Router,
			public applicationService: ApplicationService,
			public credentialService: CredentialService) {

				this.volumeSetupForm = fb.group({
				repoUri: ['', Validators.required]
			});

		}

		addVolumeSetup(event) {
			event.preventDefault();
			console.log('[VolumeSetupForm] adding ' + this.volumeSetupForm.value.repoUri);
			this.applicationService.add(this.credentialService, this.volumeSetupForm.value.repoUri)
				.subscribe(
					application  => {
						this.router.navigateByUrl('/volumes');
					},
					error => {
						console.log(error);
						this.router.navigateByUrl('/login');
					}
				);
		}

}
