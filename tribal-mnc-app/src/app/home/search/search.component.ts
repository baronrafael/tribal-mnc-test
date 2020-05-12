import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      type: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 5000,
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
        //console.log(res);
        this.searchResults = res;
        this.openSnackBar('Search for: "'+this.searchForm.get('text').value+'" in category "'+this.searchForm.get('type').value+'" returned '+this.searchResults.resultCount+' results');
        this.bSearch = false;
      },
      err => {
        console.log(err);
        delete this.searchResults;
        this.openSnackBar('Something went wrong...');
        this.bSearch = false;
      }
    );
  }

  select(collectionViewUrl){
    window.open(collectionViewUrl, '_blank');
  }

}
