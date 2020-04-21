import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  resourceData: any;
  keys: any;
  labels = {"userName":"User Name","email":"Email","projectName":"Project Name","deploymentEnvironment":"Deployment Environment","environment":"Environment","subscription":"Subscription","location":"Location","applicationName":"Application Name","tier":"Tier","owner":"Owner","deptt":"Deptt.","subDeptt":"Sub-Deptt.","resourceGroup":"Resource Group","vmResourceGroupType":"VM Resource Group Type","vmResourceTemplate":"VM Resource Template","usageDescription":"Usage Description","provisionMore":"Provision More Resources","existingResourceGroup":"Existing Resource Group","sqlResourceGroupType":"SQl Resource Group Type","sqlResourceTemplate":"Resource Template for Provisioning","dbCounts":"Counts of DB","dbDescription":"DB Description "};
  constructor(private shared: SharedService, private router: Router) { }

  flatten(data) {
    const res =  {...data, ...data.vmValues, ...data.sqlValues};
    delete res.vmValues;
    delete res.sqlValues;
    return res;
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    const formData = this.shared.saveForm();
    if (!formData) {
      this.goHome();
    } else {
      this.resourceData =  this.flatten(formData);
      this.keys = Object.keys(this.resourceData);
    }
  }

  convertToCSV() {
    let csv = this.keys.join(',') + '\n';
    this.keys.forEach(key => {
      csv += this.resourceData[key] + ',';
    });
    return csv;
  }

  saveData() {
    const dataToPost = this.convertToCSV();
    console.log('Final CSV.. ', dataToPost);

    // post this datat to a service

  }

}
