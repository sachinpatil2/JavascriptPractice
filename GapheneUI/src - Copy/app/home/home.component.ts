declare function require(path: string);
import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthenticateService} from '../login/loginService/authenticate.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import {environment} from '../../environments/environment';

declare var jquery:any;
declare var $ :any;

import * as d3 from 'd3';

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AuthenticateService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // constructor(private _service:AuthenticateService) { }
  displayedColumns = ['userID', 'userName', 'email', 'designation'];
  dataSource: MatTableDataSource<UserData>;
  logo:any = require('logo.png');
  jsondata :any;
  person ='';

  searchForm: FormGroup;
  submitted = false;

  // private LOGO = require("./assets/logo.png");
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   constructor(private http: Http,private formBuilder: FormBuilder) {
    //  this.http.get('assets/enron.json')
    //  .map((res:Response) => res.json()).subscribe( data => {
    //     // console.log('inside the http get'+ JSON.stringify(data));
    //     //console.log('Enron Data:' + JSON.stringify(data));
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // });

   // console.log('outside the http get');
    // Create 100 users
    const users: UserData[] = [];
    //for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

     //Assign the data to the data source for the table to render
    //console.log(JSON.stringify(users));
    //this.dataSource = new MatTableDataSource(users);
  }
  datas = [];
  topic = '';
  isDataExist = false;
  isSimilarTopics = false;
  similarTopics = [];
  loading = false;
  topicList = [];

  ngOnInit() {

      this.searchForm = this.formBuilder.group({
            topic: ['', [Validators.required, Validators.minLength(3)]]
        });
    this.http.get(environment.baseUrl+'/search/topics')
      .map((res:Response) => res.json()).subscribe( data => {
         console.log('inside the http get topic List:' + JSON.stringify(data.topics));
         this.topicList = data.topics;
         $("#topic").autocomplete({
          source: this.topicList,
          position: { my : "right top", at: "right bottom" }
          // console.log(this.topicList);
        });


    });


  }

   // convenience getter for easy access to form fields
    get f() { return this.searchForm.controls; }

  fetchData(topic, isDidYouMean): void {
      console.log($('#topic').val());
      if(topic == '' || topic == undefined || topic == null){
        topic = 'state energy regulators'; $('#topic').val();
        this.searchForm.get('topic').setValue(topic);
      }

      console.log(isDidYouMean);

      this.submitted = true;
    // stop here if form is invalid
        if (this.searchForm.invalid) {
            //alert('invalid');
            return ;
        }
        this.loading = true;
        this.isDataExist = true;

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.searchForm.value))

   // console.log('inside display'+this.searchForm.value.topic);
    this.topic = this.searchForm.value.topic.toLowerCase();
    console.log(this.topic);
    if(topic !== '' && topic != undefined && topic != null){
        console.log('inside if topic..' + this.searchForm.value.topic);
        this.topic = topic;
        this.searchForm.get('topic').setValue(topic);
        // this.searchForm.value.topic = this.topic;
        console.log('inside if topic..' + this.searchForm.value.topic);
    }

    let postData = {};
    if (isDidYouMean){
        postData = {"query" : this.topic,"isMultipleOptionsProvided":false};
        this.isSimilarTopics = false;
    }
    else
        postData = {"query" : this.topic,"isMultipleOptionsProvided":true};
     this.http.post(environment.baseUrl+'/search/graph',postData)
    //  this.http.post(environment.baseUrl+'/search/graph', postData)
    //  this.http.get('/assets/semantic.json')
     .map((res:Response) => res.json()).subscribe( data => {
         console.log('inside the http post' + JSON.stringify(data));
       // console.log('Enron Data:' + JSON.stringify(data));
        // var graph =
        loadBubbleChart(data);
        this.isDataExist = data.isDataFound;
        this.loading = false;
        if(data.isDataFound && data.similarTopics.length > 0){
             this.isSimilarTopics = true;
             this.similarTopics = data.similarTopics;
        }
        else
            this.isSimilarTopics = false;

        this.dataSource = new MatTableDataSource(data.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });

  }

  logout():void {}

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    if(this.dataSource !== undefined){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}


/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    email: EMAILS[Math.round(Math.random() * (EMAILS.length - 1))],
    designation: DESIGNATIONS[Math.round(Math.random() * (DESIGNATIONS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const EMAILS = ['Maia@yahoo.com', 'Asher@yahoo.com', 'Olivia@yahoo.com', 'Atticus@yahoo.com', 'Amelia@yahoo.com', 'Jack@yahoo.com',
  'Charlotte@yahoo.com', 'Theodore@yahoo.com', 'Isla@yahoo.com', 'Oliver@yahoo.com', 'Isabella@yahoo.com', 'Jasper@yahoo.com',
  'Cora@yahoo.com', 'Levi@yahoo.com', 'Violet@yahoo.com', 'Arthur@yahoo.com', 'Mia@yahoo.com', 'Thomas@yahoo.com', 'Elizabeth@yahoo.com'];
const DESIGNATIONS = ['Software Engineer','Senoir Software Engineer', 'Module Lead','Team Lead','Project Engineer',
  'Lead Project Engineer','Engineering Lead','Senoir Team Lead','Account Manager','Vice President','President'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  email: string;
  designation: string;
}

// load bubble chart
function loadBubbleChart(graph) {

    console.log(graph);

    if(graph.nodes.length > 0){
        graph.nodes[0].score = 0;
        for(let i =1;i < graph.nodes.length; i++){
        graph.nodes[i].score = Math.random().toFixed(1);
    }
    }

    var w = 500; //window.innerWidth / 8;
    var h = 500; //window.innerHeight / 8;
    //console.log(w + ":" + h);
    // var keyc = true,
    //     keys = true,
    //     keyt = true,
    //     keyr = true,
    //     keyx = true,
    //     keyd = true,
    //     keyl = true,
    //     keym = true,
    //     keyh = true,
    //     key1 = true,
    //     key2 = true,
    //     key3 = true,
    //     key0 = true

    var focus_node = null,
        highlight_node = null;

    var text_center = false;
    var outline = false;

    var min_score = 0;
    var max_score = 1;

    var color = d3.scale.linear()
        .domain([min_score, (min_score + max_score) / 2, max_score])
        .range(["lime", "yellow", "red"]);

    var highlight_color = "blue";
    var highlight_trans = 0.1;

    var size = d3.scale.pow().exponent(1)
        .domain([1, 100])
        .range([8, 24]);

    var force = d3.layout.force()
        .linkDistance(60)
        .charge(-300)
        .size([w, h]);

    var default_node_color = "#ccc";
    //var default_node_color = "rgb(3,190,100)";
    var default_link_color = "#888";
    var nominal_base_node_size = 8;
    var nominal_text_size = 10;
    var max_text_size = 24;
    var nominal_stroke = 1.5;
    var max_stroke = 4.5;
    var max_base_node_size = 36;
    var min_zoom = 0.1;
    var max_zoom = 7;

    if (d3.selectAll('svg')[0].length == 2) {
      var svg = d3.select("#graphdb").append("svg");
       console.log(d3.selectAll('svg')[0][2]);
    }
    else{
      d3.selectAll('svg')[0][2].remove();
      let svg = d3.select("#graphdb").append("svg");
       console.log(d3.selectAll('svg'));
    }

    let zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])
    let g = svg.append('g');
    svg.style("cursor", "move");
    svg.style("height", "100%");
    svg.style("width", "100%");
  //  d3.json("assets/graph.json", function(error, graph) {
      // console.log(error);
       // console.log(graph);
        const linkedByIndex = {};
        graph.links.forEach(function(d) {
            linkedByIndex[d.source + ',' + d.target] = true;
        });

        function isConnected(a, b) {
            return linkedByIndex[a.index + ',' + b.index] || linkedByIndex[b.index + ',' + a.index] || a.index === b.index;
        }

        function hasConnections(a) {
            for (const property in linkedByIndex) {
                const s = property.split(',');
                if ((s[0] === a.index || s[1] === a.index) && linkedByIndex[property]) { return true; }
            }
            return false;
        }

        force
            .nodes(graph.nodes)
            .links(graph.links)
            .start();

        const link = g.selectAll('.link')
            .data(graph.links)
            .enter().append('line')
            .attr('class', 'link')
            .style('stroke-width', nominal_stroke)
            .style('stroke', function(d) {
                if (isNumber(d.score) && d.score >= 0) { return color(d.score); } else { return default_link_color; }
            });


        const node = g.selectAll('.node')
            .data(graph.nodes)
            .enter().append('g')
            .attr('class', 'node')

            .call(force.drag);


        node.on('dblclick.zoom', function(d) {
            d3.event.stopPropagation();
            const dcx = (window.innerWidth / 4 - d.x * zoom.scale());
            const dcy = (window.innerHeight / 4 - d.y * zoom.scale());
            zoom.translate([dcx, dcy]);
            g.attr('transform', 'translate(' + dcx + ',' + dcy + ')scale(' + zoom.scale() + ')');

        });




        let tocolor = 'fill';
        let towhite = 'stroke';
        if (outline) {
            tocolor = 'stroke';
            towhite = 'fill';
        }



        const circle = node.append('path')


            .attr('d', d3.svg.symbol()
                .size(function(d) {
                    // console.log("Skill Level284:"+d.skill_Level);
                // if(parseInt(d.skill_Level) === 60)
                //     return Math.PI * Math.pow(size(d.skill_Level) || nominal_base_node_size, 2);
                // else
                    return Math.PI * Math.pow(size(parseInt(d.skill_Level) * 10) || nominal_base_node_size, 2);
                    // return (size(parseInt(d.skill_Level)*10) * base_radius / nominal_base_node_size || base_radius);

                })
                .type(function(d) {
                    return d.type;
                }))

            .style(tocolor, function(d) {
                if (isNumber(d.score) && d.score >= 0) { return color(d.score); } else { return default_node_color; }
            })
            // .attr("r", function(d) { return size(d.size)||nominal_base_node_size; })
            .style('stroke-width', nominal_stroke)
            .style(towhite, 'white');


        const text = g.selectAll('.text')
            .data(graph.nodes)
            .enter().append('text')
            .attr('dy', '.35em')
            .style('font-size', nominal_text_size + 'px');

        if (text_center) {
            text.text(function(d) {
                return d.name;
            })
            .style('text-anchor', 'middle');
        } else {
            text.attr('dx', function(d) {
               // console.log("Skill Level 313:"+parseInt(d.skill_Level));
                // if(parseInt(d.skill_Level) === 60)
                //     return (size(d.skill_Level) || nominal_base_node_size);
                // else
                    return (size(parseInt(d.skill_Level) * 10) || nominal_base_node_size);
            })
            .text(function(d) {
                return '\u2002' + d.name;
            });
        }

        node.on('mouseover', function(d) {
                set_highlight(d);
            })
            .on('mousedown', function(d) {
                d3.event.stopPropagation();
                focus_node = d;
                set_focus(d);
                if (highlight_node === null) { set_highlight(d); }

            }).on('mouseout', function(d) {
                exit_highlight();

            });

        d3.select(window).on('mouseup',
            function() {
                if (focus_node !== null) {
                    focus_node = null;
                    if (highlight_trans < 1) {

                        circle.style('opacity', 1);
                        text.style('opacity', 1);
                        link.style('opacity', 1);
                    }
                }

                if (highlight_node === null) { exit_highlight(); }
            });

        function exit_highlight() {
            highlight_node = null;
            if (focus_node === null) {
                svg.style('cursor', 'move');
                if (highlight_color !== 'white') {
                    circle.style(towhite, 'white');
                    text.style('font-weight', 'normal');
                    link.style('stroke', function(o) {
                        return (isNumber(o.score) && o.score >= 0) ? color(o.score) : default_link_color;
                    });
                }

            }
        }

        function set_focus(d) {
            if (highlight_trans < 1) {
                circle.style('opacity', function(o) {
                    return isConnected(d, o) ? 1 : highlight_trans;
                });

                text.style('opacity', function(o) {
                    return isConnected(d, o) ? 1 : highlight_trans;
                });

                link.style('opacity', function(o) {
                    return o.source.index === d.index || o.target.index === d.index ? 1 : highlight_trans;
                });
            }
        }


        function set_highlight(d) {
            svg.style('cursor', 'pointer');
            svg.style('height', '100%');
            svg.style('width', '100%');
            if (focus_node !== null) { d = focus_node; }
            highlight_node = d;

            if (highlight_color !== 'white') {
                circle.style(towhite, function(o) {
                    return isConnected(d, o) ? highlight_color : 'white';
                });
                text.style('font-weight', function(o) {
                    return isConnected(d, o) ? 'bold' : 'normal';
                });
                link.style('stroke', function(o) {
                    return o.source.index === d.index || o.target.index === d.index ? highlight_color : ((isNumber(o.score) && o.score >= 0) ? color(o.score) : default_link_color);

                });
            }
        }


        zoom.on('zoom', function() {

            let stroke = nominal_stroke;
            if (nominal_stroke * zoom.scale() > max_stroke) { stroke = max_stroke / zoom.scale(); }
            link.style('stroke-width', stroke);
            circle.style('stroke-width', stroke);

            let base_radius = nominal_base_node_size;
            if (nominal_base_node_size * zoom.scale() > max_base_node_size) { base_radius = max_base_node_size / zoom.scale(); }
            circle.attr('d', d3.svg.symbol()
                .size(function(d) {
                  //  console.log("Skill Level414:"+parseInt(d.skill_Level));
                // if(parseInt(d.skill_Level) === 60)
                //     return Math.PI * Math.pow(size(d.skill_Level) * base_radius / nominal_base_node_size || base_radius, 2);
                // else
                    return Math.PI * Math.pow(size(parseInt(d.skill_Level) * 10) * base_radius / nominal_base_node_size || base_radius, 2);
                    // return (size(parseInt(d.skill_Level)*10) || nominal_base_node_size);

                })
                .type(function(d) {
                    return d.type;
                }));

            // circle.attr("r", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); })
            if (!text_center) { text.attr('dx', function(d) {
              //  console.log("Skill Level423:"+d.skill_Level);
                // if(parseInt(d.skill_Level) === 60)
                //     return (size(d.skill_Level) * base_radius / nominal_base_node_size || base_radius);
                // else
                    return (size(parseInt(d.skill_Level) * 10) * base_radius / nominal_base_node_size || base_radius);
                   // return Math.PI * Math.pow(size(parseInt(d.skill_Level)*10) * base_radius / nominal_base_node_size || base_radius, 2);

            });
            }

            let text_size = nominal_text_size;
            if (nominal_text_size * zoom.scale() > max_text_size) { text_size = max_text_size / zoom.scale(); }
            text.style('font-size', text_size + 'px');

            g.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
        });

        svg.call(zoom);

        resize();
        // window.focus();
        // d3.select(window).on("resize", resize);//.on("keydown", keydown);

        force.on('tick', function() {

            node.attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
            text.attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

            link.attr('x1', function(d) {
                    return d.source.x;
                })
                .attr('y1', function(d) {
                    return d.source.y;
                })
                .attr('x2', function(d) {
                    return d.target.x;
                })
                .attr('y2', function(d) {
                    return d.target.y;
                });

            node.attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                });
        });

        function resize() {
          console.log('inside the resize method..');
            const width = 500, // window.innerWidth,
                height = 500; // window.innerHeight;
            // var width = "20em", height = 20em;
            console.log(width + ':' + height);
            svg.attr('width', 1000).attr('height', 700);
            // console.log([force.size()[0] + (width - w) / zoom.scale());
            // console.log(force.size()[1] + (height - h) / zoom.scale()]);
            force.size([force.size()[0] + (width - w) / zoom.scale(), force.size()[1] + (height - h) / zoom.scale()]).resume();
            w = width;
            h = height;
        }
        /*
        function keydown() {
            if (d3.event.keyCode == 32) {
                force.stop();
            } else if (d3.event.keyCode >= 48 && d3.event.keyCode <= 90 && !d3.event.ctrlKey && !d3.event.altKey && !d3.event.metaKey) {
                switch (String.fromCharCode(d3.event.keyCode)) {
                    case "C":
                        keyc = !keyc;
                        break;
                    case "S":
                        keys = !keys;
                        break;
                    case "T":
                        keyt = !keyt;
                        break;
                    case "R":
                        keyr = !keyr;
                        break;
                    case "X":
                        keyx = !keyx;
                        break;
                    case "D":
                        keyd = !keyd;
                        break;
                    case "L":
                        keyl = !keyl;
                        break;
                    case "M":
                        keym = !keym;
                        break;
                    case "H":
                        keyh = !keyh;
                        break;
                    case "1":
                        key1 = !key1;
                        break;
                    case "2":
                        key2 = !key2;
                        break;
                    case "3":
                        key3 = !key3;
                        break;
                    case "0":
                        key0 = !key0;
                        break;
                }

                link.style("display", function(d) {
                    var flag = vis_by_type(d.source.type) && vis_by_type(d.target.type) && vis_by_node_score(d.source.score) && vis_by_node_score(d.target.score) && vis_by_link_score(d.score);
                    linkedByIndex[d.source.index + "," + d.target.index] = flag;
                    return flag ? "inline" : "none";
                });
                node.style("display", function(d) {
                    return (key0 || hasConnections(d)) && vis_by_type(d.type) && vis_by_node_score(d.score) ? "inline" : "none";
                });
                text.style("display", function(d) {
                    return (key0 || hasConnections(d)) && vis_by_type(d.type) && vis_by_node_score(d.score) ? "inline" : "none";
                });

                if (highlight_node !== null) {
                    if ((key0 || hasConnections(highlight_node)) && vis_by_type(highlight_node.type) && vis_by_node_score(highlight_node.score)) {
                        if (focus_node !== null) set_focus(focus_node);
                        set_highlight(highlight_node);
                    } else {
                        exit_highlight();
                    }
                }

            }
        }
    */
  //  });
    /*
    function vis_by_type(type) {
        switch (type) {
            case "circle":
                return keyc;
            case "square":
                return keys;
            case "triangle-up":
                return keyt;
            case "diamond":
                return keyr;
            case "cross":
                return keyx;
            case "triangle-down":
                return keyd;
            default:
                return true;
        }
    }
    */
/*
    function vis_by_node_score(score) {
        if (isNumber(score)) {
            if (score >= 0.666) return keyh;
            else if (score >= 0.333) return keym;
            else if (score >= 0) return keyl;
        }
        return true;
    }

    function vis_by_link_score(score) {
        if (isNumber(score)) {
            if (score >= 0.666) return key3;
            else if (score >= 0.333) return key2;
            else if (score >= 0) return key1;
        }
        return true;
    }
*/
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

