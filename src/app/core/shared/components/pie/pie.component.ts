import { ColorService } from './../../services/color.service';
import { PieDatum } from './pie.component';
import { Component, Input, ViewChild, ElementRef, HostListener, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

declare let d3: any;

export interface PieDatum {
    id: string;
    label: string;
    value: number;
    color: string;
    bold?: boolean;
    datum?: Object;
    // These attributes are used internally by the component.
    // Would it be better if we has and extended interface ?
    box?: any;
    data?: any;
}

enum SIDE { LEFT = 1, RIGHT = 2 };

interface SidedDatum extends PieDatum {
    side: SIDE;
}

//type ArcGenerator = (data: any) => any;

/**
 * This pie component is Angular compliant. D3 is used only for the computation helpers and
 * the SVG strings generation.  
 * 
 * To manage collisions between labels, we use two columns each side of the pie.
 * Each columns is made of boxes. For each slice we look for the nearest box (starting
 * from the top) and put the label inside. If the box has already a label we look for 
 * the next nearest box below. Since we look from the top, all boxes above the selected
 * one are flagged as filled.
 */
@Component({
    selector: 'pie',
    templateUrl: 'pie.component.html',
})
export class PieComponent {

    @Input('data') data: Array<PieDatum>;
    @Input('width') width = 1000;
    @Input('height') height = 750;
    @Input('font-size') fontSize = 40;
    @Input('radius') radius: number = Math.min(this.width * 0.5, this.height * 0.5) / 2;
    @Input('inner-radius') innerRadiusCoef = 0.6;
    @Input('outer-radius') outerRadiusCoef = 0.7;
    @Input('bold-radius') boldRadiusCoef = 0.8;
    @Input('labels-radius') labelRadiusCoef = 1.15;
    @Output() sliceClick = new EventEmitter<PieDatum>();

    private svgRoot;
    private svg;
    private pie = d3.layout.pie().sort(null).value(d => d.value);
    private arc: any;
    private arcBold: any;
    private labelArc: any;
    private nbLines = 1;
    public paths;
    public texts;
    public lines;

    @ViewChild('pieElmt') pieElmt: ElementRef;

    constructor(private colorService: ColorService) { }

    ngOnChanges(changes) {
        if (changes.data && changes.data.currentValue) {
            this.arcBold = d3.svg.arc()
                .innerRadius(this.innerRadiusCoef * this.radius)
                .outerRadius(this.boldRadiusCoef * this.radius);
            this.arc = d3.svg.arc()
                .innerRadius(this.innerRadiusCoef * this.radius)
                .outerRadius(this.outerRadiusCoef * this.radius);
            this.labelArc = d3.svg.arc()
                .innerRadius(this.radius * this.labelRadiusCoef)
                .outerRadius(this.radius * this.labelRadiusCoef);
            this.updatePie(changes.data.currentValue);
        }
    }

    private updatePie(data: Array<PieDatum>) {
        this.paths = this._generateSlicesData(data);

        // Convert PieDatum to SidedDatum : 
        // we order data from 0 to PI (column of boxes on the right, top to bottom)
        // then from 2PI to PI (column of boxes on the left, top to bottom)
        const midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2;
        const sidedData: Array<SidedDatum> = [
            ...this.pie(data)
                .filter(d => midAngle(d) <= Math.PI)
                .map((d: PieDatum): SidedDatum => ({ ...d, side: SIDE.RIGHT })),
            ...this.pie(data)
                .filter(d => midAngle(d) > Math.PI)
                .map((d: PieDatum): SidedDatum => ({ ...d, side: SIDE.LEFT }))
                .reverse()
        ];
        this.texts = this._generateLabelsData(sidedData);
        this.lines = this._generateLinesData(sidedData);
    };

    private _generateSlicesData(data: Array<PieDatum>) {
        return this.pie(data).map(d => ({
            svgCode: d.data.bold ? this.arcBold(d) : this.arc(d),
            fill: d.data.color,
            datum: d
        }));
    }

    private _generateLabelsData(pieData: Array<SidedDatum>) {
        // This is the weak point : the number of boxes in each column depends on 
        // the font size. If nb slices > nb boxes, some labels won't be displayed
        let boxHeight = this.fontSize * this.nbLines * 1.75;
        let columnHeight = this.radius * this.labelRadiusCoef * 2 + boxHeight * 2 /*pour faire déborder un peu */;
        let nbBoxes = Math.floor(columnHeight / boxHeight);
        let generateBox = (side, i) => ({
            index: i,
            x: this.radius * this.labelRadiusCoef * (side === SIDE.LEFT ? -1 : 1),
            top: -columnHeight / 2 + i * boxHeight,
            bottom: -columnHeight / 2 + i * boxHeight + boxHeight,
            middle: -columnHeight / 2 + i * boxHeight + boxHeight / 2,
            datum: undefined,
            available: true
        });
        let rightBoxes = Array(nbBoxes).fill({}).map((emptyBox, i) => generateBox(SIDE.RIGHT, i));
        let leftBoxes = Array(nbBoxes).fill({}).map((emptyBox, i) => generateBox(SIDE.LEFT, i));

        return [
            ...this._generateLabelsBySide(pieData.filter(d => d.side === SIDE.RIGHT), 'rightLabel', rightBoxes),
            ...this._generateLabelsBySide(pieData.filter(d => d.side === SIDE.LEFT), 'leftLabel', leftBoxes)
        ];
    }

    private _generateLabelsBySide(data: Array<SidedDatum>, className: string, boxes) {
        return data
            .map(d => {
                let pos = { x: undefined, y: undefined };
                // Get the nearest box from the slice representing d
                let nearestBox = boxes
                    // Get available boxes
                    .filter(box => box.available === true)
                    // Compute distance from label
                    .map(box => ({ ...box, distance: Math.abs(this.labelArc.centroid(d)[1] - box.middle) }))
                    // Sort and get the nearest box
                    .sort((a, b) => a.distance - b.distance)[0];
                if (nearestBox) {
                    pos.x = nearestBox.x;
                    pos.y = nearestBox.top + (nearestBox.bottom - nearestBox.top) / 2 + this.fontSize / 2;
                    d.box = nearestBox;    // fill the box
                    // All boxes located before the choosen one are flagged as unavailable
                    boxes = boxes.map((b, i) => ({ ...b, available: i <= nearestBox.index ? false : b.available }));
                    return {
                        text: d.data.label.split('\n')[0],
                        pos,
                        fill: d.data.color,
                        side: d.side
                    };
                }
                // No  box available, we give up.
                return undefined;
            })
            // We keep defined labels.
            // Those which did not fit anywhere are ignored.
            .filter(d => d !== undefined);
    }

    private _generateLinesData(data: Array<SidedDatum>) {
        return data.map(d => ({
            points: [
                this.arc.centroid(d), // 1st point : in the middle of the arc
                this.labelArc.centroid(d), // 2nd point : to outer label arc
                [this.radius * this.labelRadiusCoef * (d.side === SIDE.LEFT ? -1 : 1),
                d.box.top + (d.box.bottom - d.box.top) / 2] // 3rd point : to the label
            ],
            stroke: d.data.color,
        }));
    }

    onSliceClick($event, datum) {
        this.sliceClick.emit(datum)
    }
}
