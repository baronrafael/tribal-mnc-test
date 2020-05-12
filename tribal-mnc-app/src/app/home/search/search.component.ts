import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from 'src/app/core/services/search.service';

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
  searchResults: any;
  bSearch = false;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      type: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  spacesToPlus(){
    let text: string = this.searchForm.get('text').value;
    return text.replace(/\s+/g, "+");
  }

  handleSearch(){
    delete this.searchResults;
    this.bSearch = true;
    this.searchService.search(this.searchForm.get('type').value, this.spacesToPlus())
    .subscribe(
      res => {
        console.log(res);
        this.searchResults = res;
        this.bSearch = false;
      },
      err => {
        console.log(err);
        this.bSearch = false;
      }
    );
  }

  select(collectionViewUrl){
    window.open(collectionViewUrl, '_blank');
  }

}
