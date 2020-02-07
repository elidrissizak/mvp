import { Component, Input, ViewChild, ElementRef, HostListener, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Currency } from '../../services/currency/currency.service';

declare let d3: any;

export interface TreemapDatum {
    id: string;
    label: string;
    value: number;
    backgroundColor: string;
    textColor: string;
    rawDatum: any;
    children: Array<any>;
    bold?: boolean;
}

type TreemapData = {
    children: Array<TreemapDatum>;
};

/**
 * The treemap component is fully managed by D3 and this is a bad practice.  
 * D3 should be here only for tedious computation, and Angular (our code) should  
 * manage the DOM. Right now, this is only a bad practice, but future Angular releases
 * may break the treemap layout/behavior.  
 * 
 * If you make the things right, beware of the immutability. Each time data are injected
 * through @Input('data') this is a new array. If you manage the DOM by your self you will
 * have to do the D3's work: manage each datum/node with an identifier.
 */
@Component({
    selector: 'treemap',
    templateUrl: 'treemap.component.html',
    styleUrls: ['treemap.component.scss']
})
export class TreemapComponent {

    @Input('data') data: Array<TreemapDatum>;
    @Input('width') width = 1000;
    @Input('height') height = 1000;
    @Input('disable-cell-click') disableCellClick: boolean;
    @Output('on-cell-click') onCellClick = new EventEmitter<TreemapDatum>();
    @Output('on-cell-over') onCellOver = new EventEmitter<TreemapDatum>();
    @Output('on-cell-out') onCellOut = new EventEmitter<TreemapDatum>();
    @Output('on-right-click') onRightClick = new EventEmitter<TreemapDatum>();

    @ViewChild('treemapGroup') tmGroupElmt: ElementRef;

    private rootNode;
    private tooltip: any;
    private treemap: any;

    private onRightClickEvent = (treemapDatum, i, nodes) => {
        d3.event.preventDefault();
        this.onRightClick.emit(treemapDatum);
    };

    ngOnChanges(changes) {
        if (changes.data && changes.data.currentValue) {
            let tmData: TreemapData = { children: changes.data.currentValue };
            this.updateTreemap(tmData);
        }
    }

    updateTreemap(data: TreemapData) {
        this.treemap = d3.layout.treemap()
            .round(false)
            .mode('squarify')
            .size([this.width, this.height])
            .sticky(true)
            .sort((a, b) => a.value - b.value)
            .value(treemapDatum => treemapDatum.value);

        this.rootNode = d3.select(this.tmGroupElmt.nativeElement);

        // Transform data to D3 treemap.
        // At the end we will get : 
        // <g><rect></rect><text></text></g>

        // Compute treemap layout.
        // Nodes are data with added attributes (dx, dy, width, etc.)
        let nodes = this.treemap.nodes(data);
        // Join nodes with data based on id
        let joined = this.rootNode.selectAll("g").data(nodes, d => d.id);
        // Add nodes for new data
        // cells will be an array of <g> DOM nodes
        let cells = joined
            .enter()
            .append("g")
            .attr("class", "tm-cell")
            .attr("transform", d => `translate(${d.x},${d.y})`);
        // Remove nodes with no data
        joined.exit().remove();
        // Update nodes
        joined
            .style('stroke', treemapDatum => treemapDatum.backgroundColor)
            .style('fill', treemapDatum => treemapDatum.backgroundColor);
        // Needed ? (not sure)
        joined.data(nodes, d => d.id);
        // For each <g> we add a <rect>
        cells.append("rect")
            .attr('id', d => 'rect-' + d.id)
            .attr("width", d => d.dx)
            .attr("height", d => d.dy)
            .style('stroke-width', '2px')
            .style('stroke', d => 'white')
            .style('overflow', 'hidden')
            .on("click", treemapDatum => !this.disableCellClick && this.onCellClick.emit(treemapDatum))
            .on('mouseover.event', treemapDatum => this.onCellOver.emit(treemapDatum))
            .on('mouseout.event', treemapDatum => this.onCellOut.emit(treemapDatum))
            .on("contextmenu", this.onRightClickEvent)
        // Each bold datum has a point (circle) inside in the middle
        cells.filter(d => d.bold).append('circle')
            .attr('cx', d => d.dx / 2)
            .attr('cy', d => d.dy / 2)
            .attr('r', d => 0.2 * ((d.dx < d.dy) ? (d.dx / 2) : (d.dy / 2)))
            .attr('fill', 'white')
            .style('stroke-width', '2px')
            .style('stroke', 'white')
            .on("click", treemapDatum => !this.disableCellClick && this.onCellClick.emit(treemapDatum))
            .on('mouseover.event', treemapDatum => this.onCellOver.emit(treemapDatum))
            .on('mouseout.event', treemapDatum => this.onCellOut.emit(treemapDatum))
            .on("contextmenu", this.onRightClickEvent)
        // clipPaths (needed ?)
        cells
            .append('clipPath')
            .attr('id', d => 'clip-' + d.id)
            .append('use')
            .attr('xlink:href', d => '#rect-' + d.id)
        // Labels
        let labels = cells
            .filter(tmDatum => tmDatum.label)
            .append("text")
            .attr("clip-path", d => `url(#clip-${d.id})`)
            .attr("x", 0)
            .attr("y", '0.5em')
            .style('fill', treemapDatum => treemapDatum.textColor)
            .style('stroke', treemapDatum => treemapDatum.textColor)
            .style('stroke-width', '1px')
            .attr("text-anchor", "start")
            .attr("alignment-baseline", "text-before-edge")
            .on("click", treemapDatum => !this.disableCellClick && this.onCellClick.emit(treemapDatum))
            .on('mouseover.event.text', treemapDatum => this.onCellOver.emit(treemapDatum))
            .on('mouseout.event.text', treemapDatum => this.onCellOut.emit(treemapDatum))

        // Labels - First line
        labels
            .append('tspan')
            .attr('x', '1em')
            .attr('dy', '1.4em')
            .text(treemapDatum => treemapDatum.label.split("\n")[0])
            .on("contextmenu", this.onRightClickEvent)
            .style("display", function (d) { return this.getComputedTextLength() < d.dx ? 'block' : 'none'; })

        // Labels - Second line
        labels.filter(tmDatum => tmDatum.label.split("\n").length > 1)
            .append('tspan')
            //.attr("dx", '1em')
            .attr('x', '1em')
            .attr('dy', '1.4em')
            .text(treemapDatum => treemapDatum.label.split("\n")[1])
            .on("contextmenu", this.onRightClickEvent)
            .style('font-size', '75%')
            .style("display", function (d) { return this.getComputedTextLength() < d.dx ? 'block' : 'none'; })

        // Labels - Third line
        labels.filter(tmDatum => tmDatum.label.split("\n").length > 2)
            .append('tspan')
            .attr('x', '1em')
            .attr('dy', '1.4em')
            .text(treemapDatum => treemapDatum.label.split("\n")[2])
            .on("contextmenu", this.onRightClickEvent)
            .style("display", function (d) { return this.getComputedTextLength() < d.dx ? 'block' : 'none'; })
            .style('font-weight', '400')
            .style('stroke', treemapDatum => treemapDatum.textColor)

        this.rootNode.selectAll('text').data(nodes, d => d.id)
            .style('stroke', 'none')
            .style('fill', treemapDatum => treemapDatum.textColor)
        // tooltips
        cells
            .append('svg:title')
            .text(treemapDatum => treemapDatum.label)
    }
}
