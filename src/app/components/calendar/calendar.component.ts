import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() color: string;
  bodyState : string = "days";

  calendarDays: number[];

  rightArrow = faChevronRight;
  leftArrow = faChevronLeft;

  years = [];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  date = new Date;
  weekday = this.date.getDay();
  month = this.date.getMonth();
  year = this.date.getFullYear();

  selectedDate;
  selectedDay;
  selectedMonth;
  selectedYear;

  constructor(private dateService: DateService) {
    this.populateDays();
    this.populateYears();
  }

  ngOnInit(): void {
  } 

  nextMonth(){
    if(this.month == 11){
      this.month = 0;
      this.year++;
    }
    else{
      this.month++
    }
    this.populateDays();
  }

  prevMonth(){
    if(this.month == 0){
      this.month = 11;
      this.year--;
    }
    else{
      this.month--
    }
    this.populateDays();
  }

  nextYear(){
    this.populateYears();
  }

  prevYear(){
    this.populateYears();
  }
  populateYears(){
    this.years = [];
    let actualYear = this.date.getFullYear();

    for(let i = 1900; i <= actualYear + 100; i++){
      this.years.push(i);
    }
  }

  populateDays(){
    this.calendarDays = [];
    let day = 0;
    let complete;
    for(let i= 0; i < this.checkWeekday(); i++){
      complete = '';
      this.calendarDays.push(complete);
    }
    for(let i = 0; i < this.checkMonth(); i++){
      day++
      this.calendarDays.push(day);
    }
  }

  checkMonth(){
    const monthDays = new Date(this.year, this.month + 1, 0);
    return monthDays.getDate()
  }

  checkWeekday(){
    const weekday = new Date(this.year, this.month + 1, 1);
    return weekday.getDay();
  }

  selectYear(year){
    this.selectedYear = year;
    this.year = year;
  }

  selectDate(day, month, year, div){
    if(div.textContent != 0){
      this.selectedDay = day;
      this.selectedMonth = month;
      this.selectedYear = year;

      this.selectedDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
      this.dateService.sendDate(this.selectedDate);
    }
  }

  SwitchBody(){
    if(this.bodyState == "days"){
      this.bodyState = "years"
    }
    else{
      this.bodyState = "days"
    } 
  }
}
