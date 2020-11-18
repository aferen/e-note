import { Component, OnInit } from "@angular/core";
import { HomeService } from "./shared/home.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  quote:string;
  author:string;
  constructor(private homeService: HomeService) {
    this.homeService.get().subscribe(
      (data) => {
        //console.log(JSON.stringify(data["children"][0].children))
        // this.storage.set("data", data["children"][0].children);
        this.quote = data.quote.body;
        this.author = data.quote.author;
        console.log(data.quote.body)
      },
      (err) => console.error(err)
    );
  }

  ngOnInit(): void {}

}
