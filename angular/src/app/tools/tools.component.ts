import { MediaService } from './../mediaService/media.service';
import { Tool } from './../Tool';
import { ToolsService } from './../toolservice/tools.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.sass']
})
export class ToolsComponent implements OnInit {
  tools: Tool[];

  constructor(
    private toolsService: ToolsService,
  ) { }

  ngOnInit() {
    this.getTools();
  }
  getTools(): void {
    this.toolsService.getTools()
        .subscribe(toolsData => {
          this.tools = toolsData;
          console.log(toolsData);
        });
  }

}
