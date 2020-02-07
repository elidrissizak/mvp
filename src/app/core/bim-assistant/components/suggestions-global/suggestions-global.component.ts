import { Component, Input } from "@angular/core";
import { DataService } from '../../services/data.service';

@Component({
    selector: 'suggestions-global',
    templateUrl: 'suggestions-global.component.html',
    styleUrls: ['suggestions-global.component.scss']
})
export class SuggestionsGlobalComponent {

    @Input('suggestions') clusters;
    customClass = 'customClass';
    selectedCluster : any;
    constructor( private _dataService: DataService) {
    
    }

    ngOnInit() {
        this.clusters.forEach(c => c.open = false);
        this.clusters.forEach(c => c.clusterLinks = c.clusterLinks.filter(link => link.idClusterLink));
    }
    setCluster(cluster:any): void{  
        this._dataService.sendUser(cluster);
          console.log("==> selected =>  "+cluster);
            
    }  
}
