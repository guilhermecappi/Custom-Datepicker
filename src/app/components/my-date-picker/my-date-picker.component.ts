import { Component, Input, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'my-date-picker',
  templateUrl: './my-date-picker.component.html',
  styleUrls: ['./my-date-picker.component.scss']
})
export class MyDatePickerComponent implements OnInit {
  @Input() color: string = ''
  toggleCalendar: boolean = false;

  MyPickerDate = new Date;

  formatedDate;
  date;
  dateIcon = faCalendar;

  constructor(private dateService: DateService) {
    dateService.recieveDate().subscribe(date =>{
      this.date = date;
      this.formatDate(this.date);
    })
  }
  ngOnInit(): void {
  }
  formatDate(date){
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(day < 10){
      day = '0' + day;
    }
    if(month < 10){
      month = '0' + month;
    }

    this.formatedDate = `${month}/${day}/${year}`
  }
  openCalendar(){
    this.toggleCalendar = !this.toggleCalendar;
  } 
}
