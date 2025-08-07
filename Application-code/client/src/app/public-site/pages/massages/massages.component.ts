import { Component } from '@angular/core';
import { TabsMassagesComponent } from '../../../public-site/components/tabs-massages/tabs-massages.component';
import { TabsSoinsComponent } from '../../../public-site/components/tabs-soins/tabs-soins.component';
import { ProgrammesComponent } from "../../../public-site/components/programmes/programmes.component";
import { GrilleTarifsComponent } from '../../../public-site/components/grille-tarifs/grille-tarifs.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-massages',
  imports: [TabsMassagesComponent, TabsSoinsComponent, ProgrammesComponent, GrilleTarifsComponent],
  templateUrl: './massages.component.html',
  styleUrl: './massages.component.css'
})
export class MassagesComponent {
  constructor() {}
}