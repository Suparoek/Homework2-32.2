import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit,NgModule, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-convert-rate',
  templateUrl: './convert-rate.component.html',
  styleUrls: ['./convert-rate.component.css']
})
export class ConvertRateComponent implements OnInit {
  number=123
  @Input() 
  currency1!:string
  amount!:number
  currency2!:string;
  @Output()
  Cuss!:number

  curry:string[] = [];
  form: FormGroup;
  states:string[] =['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF',
   'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 
   'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 
   'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 
   'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD',
    'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 
    'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 
    'SOS', 'SRD', 'STD', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 
    'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMK', 'ZMW', 'ZWL'];
  post!:any[];
  constructor(private httpClient:HttpClient,private fb:FormBuilder) { 
    this.form  = this.fb.group({
      amount1:['',[Validators.required]],
      curr1: [{ value:'',disabled:true},[Validators.required]],
      curr2: [{ value:'',disabled:true},[Validators.required]]
    });
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  Convent(){
    this.curry=[];
    this.post=[];
    this.httpClient.get(`http://api.exchangeratesapi.io/v1/latest?access_key=214069aff8f6abd1b3967f0a2e5987e0&symbols=${this.currency1},${this.currency2}`)
    .subscribe(result => {
      this.post.push(result);
      for(let test of this.post){
        //for(let txt of Object.entries(test.rates)){
            this.curry.push(test.rates[this.currency1]);
            this.curry.push(test.rates[this.currency2]);
       // }
           this.Cuss = (Number(this.curry[1])/ Number(this.curry[0])*this.amount);
      }
   });
  }
  ngOnInit(): void {
    //this.loadPost();
  }
  /*loadPost(){
      this.post=[];
      this.httpClient.get('http://api.exchangeratesapi.io/v1/latest?access_key=214069aff8f6abd1b3967f0a2e5987e0')
      .subscribe(result => {
         this.post.push(result);
      });

      }*/
   
}
