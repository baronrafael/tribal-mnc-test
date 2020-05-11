import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  types: any[] = [
    {value: 'movie'},
    {value: 'podcast'},
    {value: 'music'},
    {value: 'musicVideo'},
    {value: 'audiobook'},
    {value: 'shortFilm'},
    {value: 'tvShow'},
    {value: 'software'},
    {value: 'ebook'},
    {value: 'all'}
  ];

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      type: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  handleSearch(){
    console.log(this.searchForm.value);
  }

}
