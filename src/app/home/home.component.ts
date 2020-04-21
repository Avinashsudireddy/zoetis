import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  resourceGroup: String;

  resourceForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    projectName: ['', Validators.required],
    deploymentEnvironment: ['', Validators.required],
    environment: ['', Validators.required],
    subscription: ['', Validators.required],
    location: ['', Validators.required],
    applicationName: ['', Validators.required],
    tier: ['', Validators.required],
    owner: ['', Validators.required],
    deptt: ['', Validators.required],
    subDeptt: ['', Validators.required],

    vmValues: this.fb.group({
      resourceGroup: ['', Validators.required],
      vmResourceGroupType: ['', Validators.required],
      vmResourceTemplate: ['', Validators.required],
      usageDescription: ['', Validators.required]
    }),

    sqlValues: this.fb.group({
      provisionMore: ['', Validators.required],
      existingResourceGroup: ['', Validators.required],
      sqlResourceGroupType: ['', Validators.required],
      sqlResourceTemplate: ['', Validators.required],
      dbCounts: ['', Validators.required],
      dbDescription: ['', Validators.required]
    })

  });

  constructor(private fb: FormBuilder, private router: Router, private shared: SharedService) { }
  
  ngOnInit() {
    const resourceData = this.shared.saveForm();
    if (resourceData) {
      this.resourceForm.setValue(resourceData);
    }
  }

 res(){
  this.resourceGroup = this.resourceForm.get('vmValues').value.resourceGroup
 }
  get f() { return this.resourceForm.controls; }

  get vmValues() { return this.resourceForm.get('vmValues'); }

  get sqlValues() { return this.resourceForm.controls.sqlValues; }

  confirm() {
    this.shared.saveForm(this.resourceForm.value);
    this.router.navigate(['/confirm']);
  }

}
