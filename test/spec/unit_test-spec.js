$c.DEBUG_MODE = true;
describe ('String', function () {
	it('capitalize',function(){
		expect($c.capitalize("word of the day")).toBe("Word of the day");
		expect($c.capitalize("word of the day",1)).toBe("wOrd of the day");
		expect($c.capitalize("word of the day",0,true)).toBe("Word Of The Day");
		expect($c.capitalize("word of the day",1,true)).toBe("wOrd oF tHe dAy");
	});
	it('convertUTCDate',function(){
		expect($c.convertUTCDate("2016/12/13 10:01:33", "/")).toBe("12/13/2016 10:01:33");
		expect($c.convertUTCDate("2016.12.13 10:01:33", ".")).toBe("12/13/2016 10:01:33");
		expect($c.convertUTCDate("2016-12-13 10:01:33", "-")).toBe("12/13/2016 10:01:33");
	});
	it('count',function(){
		expect("calaiedc8a".count("a")).toBe(3);
		expect("calaiedc8a".count("c")).toBe(2);
		expect("calaiedc8a".count("-")).toBe(0);
	});
	it('cut',function(){
		expect($c.cut("cala",1,2)).toBe("cla");
		expect($c.cut("cala", 1,2,"p")).toBe("cpla");
	});
	it('ellipsis',function(){
		expect($c.ellipsis("calasdfadfasdfasdfadf",1)).toBe("c...alasdfadfasdfasdfadf");
		expect($c.ellipsis("calasdfadfasdfasdfadf", 1,2)).toBe("c...df");
	});
	it('endsWithAny',function(){
		expect($c.endsWithAny("calasdfadfasdfasdfadf",'a','p','f')).toBe("f");
		expect($c.endsWithAny("calasdfadfasdfasdfadf",['a','p','f'])).toBe("f");
		expect($c.endsWithAny("calasdfadfasdfasdfadf",'a')).toBe(false);
		expect($c.endsWithAny("calasdfadfasdfasdfadf",['a'])).toBe(false);
	});
	it('highlight',function(){
		expect($c.highlight("cal",'a')).toBe("c<span class=\"chighlight\">a</span>l");
		expect($c.highlight("cal",/a/)).toBe("c<span class=\"chighlight\">a</span>l");
		expect($c.highlight("cal",'a','chl')).toBe("c<span class=\"chl\">a</span>l");
		expect($c.highlight("cal",/a/,'chl')).toBe("c<span class=\"chl\">a</span>l");
		expect($c.highlight("cal",'a',null,'div')).toBe("c<div class=\"chighlight\">a</div>l");
		expect($c.highlight("cal",/a/,null,'div')).toBe("c<div class=\"chighlight\">a</div>l");
		expect($c.highlight("cal",'a',"chl",'div')).toBe("c<div class=\"chl\">a</div>l");
		expect($c.highlight("cal",/a/,"chl",'div')).toBe("c<div class=\"chl\">a</div>l");
	});
	it('indexOfAlt',function(){
		expect("cal".indexOfAlt(/a/)).toBe(1);
		expect("cala".indexOfAlt(/a/,2)).toBe(3);
	});
	it('ireplace_all',function(){
		expect($c.ireplace_all("calA",'a','')).toBe('cl');
	});
	it('isCuid',function(){
		var c = $c.cuid();
		expect($c.isCuid(c)).toBe(true);
	});
	it('isBlank',function(){
		expect($c.isBlank("cal")).toBe(false);
		expect($c.isBlank("")).toBe(true);
	});
	it('isValidEmail',function(){
		expect($c.isValidEmail("cal")).toBe(false);
		expect($c.isValidEmail("cal@craydent.com")).toBe(true);
	});
	it('lastIndexOfAlt',function(){
		expect("caal".lastIndexOfAlt(/a/)).toBe(2);
		expect("caal".lastIndexOfAlt(/a/,0)).toBe(-1);
	});
	it('ltrim',function(){
		expect($c.ltrim("     cal ")).toBe("cal ");
		expect($c.ltrim("     aacalaaa",'a')).toBe("     aacalaaa");
		expect($c.ltrim("aacalaaa",'a')).toBe("calaaa");
	});
	it('pluralize',function(){
		expect($c.pluralize("life")).toBe("lives");
		expect($c.pluralize("history")).toBe("histories");
		expect($c.pluralize("deer")).toBe("deer");
	});
	it('replace_all',function(){
		expect($c.replace_all("calA",'a','')).toBe("clA");
		expect($c.replace_all("calaaa",'a','')).toBe("cl");
		expect($c.replace_all("calaaa",'a','b')).toBe("cblbbb");
		expect($c.replace_all("calaaa",['c','a'],['d','b'])).toBe("dblbbb");
		expect($c.replace_all("calaaa",['c','a'],['b'])).toBe("bblbbb");
	});
	it('reverse',function(){
		expect($c.reverse("cal")).toBe("lac");
	});
	it('rtrim',function(){
		expect($c.rtrim(" cal  ")).toBe(" cal");
		expect($c.rtrim("     aacalaaa",'a')).toBe("     aacal");
		expect($c.rtrim("aacalaaa",'a')).toBe("aacal");
	});
	// TO/DO sanitize
	//it('sanitize',function(){
	//	expect($c.rtrim(" cal  ")).toBe(" cal");
	//	expect($c.rtrim("     aacalaaa",'a')).toBe("     aacal");
	//	expect($c.rtrim("aacalaaa",'a')).toBe("aacal");
	//});
	it('singularize',function(){
		expect($c.singularize("lives")).toBe("life");
		expect($c.singularize("histories")).toBe("history");
		expect($c.singularize("deer")).toBe("deer");
	});
	it('startsWithAny',function(){
		expect($c.startsWithAny("calasdfadfasdfasdfadf",'a','c','f')).toBe("c");
		expect($c.startsWithAny("calasdfadfasdfasdfadf",['a','c','f'])).toBe("c");
		expect($c.startsWithAny("calasdfadfasdfasdfadf",'a')).toBe(false);
		expect($c.startsWithAny("calasdfadfasdfasdfadf",['a'])).toBe(false);
	});
	it('strip',function(){
		expect($c.strip("aaaaaaaaaaaacalaaaaaaaaaa",'a')).toBe("cal");
		expect($c.strip("aaaaaaaaaaaacalaaaaaaaaaab",'a')).toBe("calaaaaaaaaaab");
		expect($c.strip("aaaaaaaaaaaacalaaaaaaaaaa",['a','l'])).toBe('c');
	});
	it('toCurrencyNotation',function(){
		expect($c.toCurrencyNotation("1000")).toBe("1,000");
		expect($c.toCurrencyNotation("1000000")).toBe("1,000,000");
		expect($c.toCurrencyNotation("1000",'.')).toBe('1.000');
	});
	it('toDateTime',function(){
		//console.log($c.toDateTime("30-12-2012"));
		expect($c.toDateTime("30-12-2012")).toEqual(new Date("12/30/2012"));
		expect($c.toDateTime("30.12.2012")).toEqual(new Date("12/30/2012"));
		expect($c.toDateTime("2012-12-30")).toEqual(new Date("12/30/2012"));
		expect($c.toDateTime("2012.12.30")).toEqual(new Date("12/30/2012"));
		expect($c.toDateTime("2012.12.30",{format:'m/d/Y'})).toEqual("12/30/2012");
		expect($c.toDateTime("2012.12.30",{format:'d/m/Y'})).toEqual("30/12/2012");
		//expect($c.toDateTime("1000",'.')).toBe('1.000');
	});
	it('toObject',function(){
		expect(JSON.stringify($c.toObject("p1=1&p2=2&p3=3"))).toBe(JSON.stringify({p1:"1",p2:"2",p3:"3"}));
		expect(JSON.stringify($c.toObject("p1=1"))).toBe(JSON.stringify({p1:"1"}));
		expect(JSON.stringify($c.toObject("p1=&p2"))).toBe(JSON.stringify({p1:"",p2:undefined}));
	});
	it('toDomElement',function(){
		var div = document.createElement('div');
		div.innerHTML = 'hello';
		div.setAttribute('data-attr','attr1');
		expect($c.toDomElement("<div data-attr='attr1'>hello</div>")).toEqual(div);
	});
	it('trim',function(){
		expect("    cal    ".trim()).toBe("cal");
		expect("    cal".trim()).toBe("cal");
		expect("cal   ".trim()).toBe("cal");
	});

});
describe ('Array', function () {
	var arrObjs = [
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}],
		arrStrings = ["string 1","string 2","string 3","string 4"],
		arrMix = [1,{},"adsf",10],
		arrSort = [{id:1, s:5},{id:2, s:5},{id:3, s:6},{id:4, s:3},{id:5, s:2}],
		arrLookup = [{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2 },{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1 },{ "_id" : 3  }],
		arrLookupJoiner = [{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70 },
			{ "_id" : 5, "sku": null, description: "Incomplete" },
			{ "_id" : 6 }],
		arrGroup = [
			{ "_id" : 1, item: { "sku" : "111" }, name : "p1", status: "ordered", "instock" : 10 },
			{ "_id" : 2, item: { "sku" : "222" }, name : "p2", status: "ordered", "instock" : 80 },
			{ "_id" : 3, item: { "sku" : "111" }, name : "p1", status: "ordered", "instock" : 60 },
			{ "_id" : 4, item: { "sku" : "333" }, name : "p3", status: "ordered", "instock" : 70 },
			{ "_id" : 5, item: { "sku" : "111" }, name : "p1", status: "incomplete" },
			{ "_id" : 6 }],
		arrTree = [
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,share:"shared", odd:false},
			{id:5,share:"shared1", odd:true}
		];
	it('aggregate',function(){
		// $project
		expect($c.aggregate($c.duplicate(arrObjs,true),[{$project:{p:1,index:1,b:10}}])).toEqual([
			{p:"10", index: 10, b: 10},
			{p:"20", index: 20, b: 10},
			{p:"30", index: 30, b: 10},
			{b: 10}]);
		expect($c.aggregate($c.duplicate(arrObjs,true),[{$project:{p:1,index:1,b:{$multiply:['$index',10]}}}])).toEqual([
			{p:"10", index: 10, b: 100},
			{p:"20", index: 20, b: 200},
			{p:"30", index: 30, b: 300},
			{b: 0}]);
		expect($c.aggregate($c.duplicate(arrObjs,true),[{$project:{p:1,index:1}}])).toEqual([
			{p:"10", index: 10},
			{p:"20", index: 20},
			{p:"30", index: 30},
			{}]);
		// $match
		expect($c.aggregate($c.duplicate(arrObjs,true),[{$match:{p:"10"}}])).toEqual([
			{id:1,p:"10",share:"shared",index:10,std:4}
		]);
		// $redact
		expect($c.aggregate([{
			_id: 1,
			title: "123 Department Report",
			tags: [ "G", "STLW" ],
			year: 2014,
			subsections: [
				{
					subtitle: "Section 1: Overview",
					tags: [ "SI", "G" ],
					content:  "Section 1: This is the content of section 1."
				},
				{
					subtitle: "Section 2: Analysis",
					tags: [ "STLW" ],
					content: "Section 2: This is the content of section 2."
				},
				{
					subtitle: "Section 3: Budgeting",
					tags: [ "TK" ],
					content: {
						text: "Section 3: This is the content of section3.",
						tags: [ "HCS" ]
					}
				}
			]
		}],[{$redact:{
			$cond: {
				if: { $gt: [ { $size: { $setIntersection: [ "$tags", [ "STLW", "G" ] ] } }, 0 ] },
				then: "$$KEEP",
				else: "$$PRUNE"
			}
		}}])).toEqual([
			{
				"_id" : 1,
				"title" : "123 Department Report",
				"tags" : [ "G", "STLW" ],
				"year" : 2014,
				"subsections" : [
					{
						"subtitle" : "Section 1: Overview",
						"tags" : [ "SI", "G" ],
						"content" : "Section 1: This is the content of section 1."
					},
					{
						"subtitle" : "Section 2: Analysis",
						"tags" : [ "STLW" ],
						"content" : "Section 2: This is the content of section 2."
					},
					{
						subtitle: "Section 3: Budgeting",
						tags: [ "TK" ],
						content: {
							text: "Section 3: This is the content of section3.",
							tags: [ "HCS" ]
						}
					}
				]
			}
		]);
		expect($c.aggregate([{
			_id: 1,
			title: "123 Department Report",
			tags: [ "G", "STLW" ],
			year: 2014,
			subsections: [
				{
					subtitle: "Section 1: Overview",
					tags: [ "SI", "G" ],
					content:  "Section 1: This is the content of section 1."
				},
				{
					subtitle: "Section 2: Analysis",
					tags: [ "STLW" ],
					content: "Section 2: This is the content of section 2."
				},
				{
					subtitle: "Section 3: Budgeting",
					tags: [ "TK" ],
					content: {
						text: "Section 3: This is the content of section3.",
						tags: [ "HCS" ]
					}
				}
			]
		}],[{$redact:{
			$cond: {
				if: { $gt: [ { $size: { $setIntersection: [ "$tags", [ "STLW", "G" ] ] } }, 0 ] },
				then: "$$DESCEND",
				else: "$$PRUNE"
			}
		}}])).toEqual([
			{
				"_id" : 1,
				"title" : "123 Department Report",
				"tags" : [ "G", "STLW" ],
				"year" : 2014,
				"subsections" : [
					{
						"subtitle" : "Section 1: Overview",
						"tags" : [ "SI", "G" ],
						"content" : "Section 1: This is the content of section 1."
					},
					{
						"subtitle" : "Section 2: Analysis",
						"tags" : [ "STLW" ],
						"content" : "Section 2: This is the content of section 2."
					}
				]
			}
		]);
		// $limit
		expect($c.aggregate($c.duplicate(arrObjs,true),[{$limit:1}])).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		// $skip
		expect($c.aggregate($c.duplicate(arrObjs,true),[{$skip:3}])).toEqual([{id:4,std:4}]);
		// $unwind
		expect($c.aggregate([{ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] }],[{ $unwind : "$sizes" }])).toEqual([
			{ "_id" : 1, "item" : "ABC1", "sizes" : "S" },
			{ "_id" : 1, "item" : "ABC1", "sizes" : "M" },
			{ "_id" : 1, "item" : "ABC1", "sizes" : "L" }
		]);
		expect($c.aggregate([{ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] },{ "_id" : 2, "item" : "ABC1" }],[{ $unwind : {path:"$sizes",preserveNullAndEmptyArrays:true} }])).toEqual([
			{ "_id" : 1, "item" : "ABC1", "sizes" : "S" },
			{ "_id" : 1, "item" : "ABC1", "sizes" : "M" },
			{ "_id" : 1, "item" : "ABC1", "sizes" : "L" },
			{ "_id" : 2, "item" : "ABC1" }
		]);
		expect($c.aggregate(
			[{ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] },{ "_id" : 2, "item" : "ABC1" }],
			[{ $unwind : {path:"$sizes",preserveNullAndEmptyArrays:true,includeArrayIndex:"ind"} }])).toEqual([
				{ "_id" : 1, "item" : "ABC1", "sizes" : "S",ind:0 },
				{ "_id" : 1, "item" : "ABC1", "sizes" : "M",ind:1 },
				{ "_id" : 1, "item" : "ABC1", "sizes" : "L",ind:2 },
				{ "_id" : 2, "item" : "ABC1",ind:0 }
			]);
		// $group & $sample
		expect($c.aggregate($c.duplicate(arrObjs,true),[
			{$sample:{size: 4}},
			{$group: {
				_id: null,
				count: {$sum: 1},
				averageQuantity: {$avg: "index"},
				totalPrice: {$sum: {$multiply: ["$id", "$index"]}},
				f: {$first: "$p"},
				l: {$last: "$p"},
				max: {$max:'$index'},
				min: {$min:'$index'},
				pushed:{$push:"$share"},
				theset:{$addToSet:"$share"},
				stdsamp:{$stdDevSamp:"$std"},
				stdpop:{$stdDevPop:"$std"}
		}}])).toEqual([{_id:null,totalPrice:140,averageQuantity:20,count:4,f:"10",l:"30",max:30,min:10,pushed:["shared","shared","shared"],theset:["shared"],stdsamp:0,stdpop:0}]);
		// $sample
		expect($c.aggregate($c.duplicate(arrObjs,true),[{$sample: { size: 2}}]).length).toBe(2);
		// $sort
		expect($c.aggregate($c.duplicate(arrSort,true),[{$sort: { s: -1, id: 1}}])).toEqual([{id:3,s:6},{id:1,s:5},{id:2,s:5},{id:4,s:3},{id:5,s:2}]);
		// $geoNear *****not implemented
		// $lookup
		expect($c.aggregate($c.duplicate(arrLookup,true),[{$lookup: {from:$c.duplicate(arrLookupJoiner,true),localField:"item",foreignField:"sku",as:"idocs"}}])).toEqual([
			{
				"_id" : 1,
				"item" : "abc",
				"price" : 12,
				"quantity" : 2,
				"idocs" : [
					{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120 }
				]
			},
			{
				"_id" : 2,
				"item" : "jkl",
				"price" : 20,
				"quantity" : 1,
				"idocs" : [
					{ "_id" : 4, "sku" : "jkl", "description" : "product 4", "instock" : 70 }
				]
			},
			{
				"_id" : 3,
				"idocs" : [
					{ "_id" : 5, "sku" : null, "description" : "Incomplete" },
					{ "_id" : 6 }
				]
			}
		]);
		// $out
		var arrOut = [];
		expect($c.aggregate($c.duplicate(arrObjs,true),[
			{$group: {
				_id: null,
				count: {$sum: 1},
				averageQuantity: {$avg: "index"},
				totalPrice: {$sum: {$multiply: ["$id", "$index"]}},
			}},{$out:arrOut}])).toBe(arrOut);
		expect(arrOut).toEqual([{_id:null,totalPrice:140,averageQuantity:20,count:4}]);

	});
	it('average',function(){
		expect($c.average(arrMix)).toBe(11/2);
	});
	it('buildTree',function(){
		expect($c.buildTree($c.duplicate(arrTree,true), function(item){
			return !item.index;
		},'share')).toEqual([{id:4,share:"shared",odd:false,children:[
			{id:1,p:"10",share:"shared", index: 10,std:4,children:[]},
			{id:2,p:"20",share:"shared", index : 20,std:4,children:[]},
			{id:3,p:"30",share:"shared", index: 30,std:4,children:[]}
		]},{id:5,share:"shared1",odd:true,children:[]}]);
		expect($c.buildTree($c.duplicate(arrTree,true), function(item){
			return !item.index;
		},'share',{childProperty:"cc"})).toEqual([{id:4,share:"shared",odd:false,cc:[
			{id:1,p:"10",share:"shared", index: 10,std:4,cc:[]},
			{id:2,p:"20",share:"shared", index : 20,std:4,cc:[]},
			{id:3,p:"30",share:"shared", index: 30,std:4,cc:[]}]
		},{id:5,share:"shared1",odd:true,cc:[]}]);
		expect($c.buildTree($c.duplicate(arrTree,true), function(item){
			return !$c.isNull(item.odd);
		},function(item){ return $c.isOdd(item.id); },{childProperty:"cc"})).toEqual([
			{id:4,share:"shared",odd:false,cc:[{id:2,p:"20",share:"shared", index : 20,std:4,cc:[]}]},
			{id:5,share:"shared1",odd:true,cc:[{id:1,p:"10",share:"shared", index: 10,std:4,cc:[]}, {id:3,p:"30",share:"shared", index: 30,std:4,cc:[]}]}
		]);
	});
	it('condense',function(){
		expect($c.condense(['a','','b',0,'c',false,'d',null,'e',undefined])).toEqual(['a','b',0,'c',false,'d','e']);
		expect($c.condense(['a','','b',0,'c',false,'d',null,'e',undefined,'e','a','c'],true)).toEqual(['a','b',0,'c',false,'d','e']);
	});
	it('count',function(){
		expect($c.count(arrObjs)).toBe(4);
		expect($c.count(arrObjs,{id:1})).toBe(1);
	});
	it('delete',function(){
		var temp = $c.duplicate(arrObjs,true);
		expect($c.delete(temp,{share:"shared"})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect(temp).toEqual([
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		expect($c.delete(temp,{share:"shared"},false)).toEqual([
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect(temp).toEqual([{id:4,std:4}]);
	});
	it('distinct',function(){
		var temp = $c.duplicate(arrObjs,true);
		expect($c.distinct(temp,["share","std"])).toEqual([
			{share:"shared",std:4},{std:4}]);
		expect($c.distinct(temp,"share,std")).toEqual([
			{share:"shared",std:4},{std:4}]);

		expect($c.distinct(temp,["share"])).toEqual(["shared",undefined]);
		expect($c.distinct(temp,"share")).toEqual(["shared",undefined]);


		expect($c.distinct(temp,["share","std"],{share:{$exists:1}})).toEqual([
			{share:"shared",std:4}]);
		expect($c.distinct(temp,"share,std",{share:{$exists:1}})).toEqual([
			{share:"shared",std:4}]);

		expect($c.distinct(temp,["share"],{share:{$exists:1}})).toEqual(["shared"]);
		expect($c.distinct(temp,"share",{share:{$exists:1}})).toEqual(["shared"]);


	});
	it('every',function(){
		var arr = ['a','','b',0,'c',false,'d',null,'e',undefined];
		expect(arr.every(function(item,i,arr){ return !$c.isNull(item); })).toBe(false);
		expect(arr.condense().every(function(item,i,arr){ return !$c.isNull(item); })).toBe(true);
	});
	it('filter',function(){
		var arr = ['a','','b',0,'c',false,'d',null,'e',undefined];
		expect(arr.filter(function(item,i,arr){ return item; })).toEqual(['a','b','c','d','e']);
	});
	it('group',function(){
		var temp = $c.duplicate(arrGroup);
		expect($c.group(temp, {key:{'item.sku': 1, name: 1 },reduce:function(curr, result){ }, initial: {},})).toEqual([
			{item:{sku:'111'}, name: 'p1' },
			{item:{sku:'222'}, name: 'p2' },
			{item:{sku:'333'}, name: 'p3' },
			{item:{sku : null}, name : null}
		]);

		temp = $c.duplicate(arrGroup);
		expect($c.group(temp, {
			cond: {_id:{$exists:true}},
			key:{'item.sku': 1, name: 1 },
			reduce:function(curr, result){ result.total += curr.instock || 0; },
			initial: { total: 0},
		})).toEqual([
			{item:{sku:'111'}, name: 'p1', total : 70 },
			{item:{sku:'222'}, name: 'p2', total : 80 },
			{item:{sku:'333'}, name: 'p3', total : 70 },
			{item:{sku : null}, name : null, total : 0}
		]);

		temp = $c.duplicate(arrGroup);
		expect($c.group(temp, {
			cond: {_id:{$exists:true}},
			key:{'item.sku': 1, name: 1 },
			reduce:function(curr, result){ result.total += curr.instock || 0; },
			initial: { total: 0},
			finalize: function(result){ return {}; }
		})).toEqual([{ }, { }, { }, { }]);

		expect($c.group(temp, {
			cond: {neverTrue: ""},
			key:{'item.sku': 1, name: 1 },
			reduce:function(curr, result){ },
			initial: {},
		})).toEqual([]);
	});
	// TO/DO groupBy
	//it('groupBy',function(){
	//
	//});
	it('indexOf',function(){
		expect($c.indexOf(arrStrings,"string 1")).toBe(0);
		expect($c.indexOf(arrStrings,"string 10")).toBe(-1);
	});
	it('indexOfAlt',function(){
		expect($c.indexOfAlt(arrObjs,"20",function(item){ return item.p})).toBe(1);
		expect($c.indexOfAlt(arrObjs,"201",function(item){ return item.p})).toBe(-1);
	});
	it('innerJoin',function(){
		expect($c.innerJoin($c.duplicate(arrLookup,true),$c.duplicate(arrLookupJoiner,true),"_id=_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);
		expect($c.innerJoin($c.duplicate(arrLookup,true),$c.duplicate(arrLookupJoiner,true),"_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);
	});
	it('insert',function(){
		arrMix = [1,{},"adsf",10];
		var temp = $c.duplicate(arrMix,true);
		expect($c.insert(temp,'abcd')).toEqual(true);
		expect(temp).toEqual([1,{},"adsf",10,'abcd']);

		temp = $c.duplicate(arrMix,true);
		expect($c.insert(temp,['abcd',99])).toEqual(true);
		expect(temp).toEqual([1,{},"adsf",10,'abcd',99]);

	});
	it('insertAfter',function(){
		arrMix = [1,{},"adsf",10];
		var temp = $c.duplicate(arrMix,true);
		expect($c.insertAfter(temp,1,'abcd')).toEqual(true);
		expect(temp).toEqual([1,{},'abcd',"adsf",10]);

		temp = $c.duplicate(arrMix,true);
		expect($c.insertAfter(temp,1,['abcd',99])).toEqual(true);
		expect(temp).toEqual([1,{},['abcd',99],"adsf",10]);
	});
	it('insertBefore',function(){
		arrMix = [1,{},"adsf",10];
		var temp = $c.duplicate(arrMix,true);
		expect($c.insertBefore(temp,1,'abcd')).toEqual(true);
		expect(temp).toEqual([1,'abcd',{},"adsf",10]);

		temp = $c.duplicate(arrMix,true);
		expect($c.insertBefore(temp,1,['abcd',99])).toEqual(true);
		expect(temp).toEqual([1,['abcd',99],{},"adsf",10]);

	});
	it('isEmpty',function(){
		expect($c.isEmpty(arrObjs)).toBe(false);
		expect($c.isEmpty([])).toBe(true);
	});
	it('joinLeft',function(){
		expect($c.joinLeft($c.duplicate(arrLookup,true),$c.duplicate(arrLookupJoiner,true),"_id=_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);
		expect($c.joinLeft($c.duplicate(arrLookup,true),$c.duplicate(arrLookupJoiner,true),"_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);


		expect($c.joinLeft($c.duplicate(arrLookupJoiner,true),$c.duplicate(arrLookup,true),"_id=_id")).toEqual([
			{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120, "item" : "abc", "price" : 12, "quantity" : 2 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80, "item" : "jkl", "price" : 20, "quantity" : 1 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70, "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 5, "sku": null, description: "Incomplete", "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 6, "item" : null, "price" : null, "quantity" : null }]);
		expect($c.joinLeft($c.duplicate(arrLookupJoiner,true),$c.duplicate(arrLookup,true),"_id")).toEqual([
			{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120, "item" : "abc", "price" : 12, "quantity" : 2 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80, "item" : "jkl", "price" : 20, "quantity" : 1 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70, "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 5, "sku": null, description: "Incomplete", "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 6, "item" : null, "price" : null, "quantity" : null }]);
	});
	it('joinRight',function(){
		expect($c.joinRight($c.duplicate(arrLookupJoiner,true),$c.duplicate(arrLookup,true),"_id=_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);
		expect($c.joinRight($c.duplicate(arrLookupJoiner,true),$c.duplicate(arrLookup,true),"_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);


		expect($c.joinRight($c.duplicate(arrLookup,true),$c.duplicate(arrLookupJoiner,true),"_id=_id")).toEqual([
			{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120, "item" : "abc", "price" : 12, "quantity" : 2 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80, "item" : "jkl", "price" : 20, "quantity" : 1 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70, "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 5, "sku": null, description: "Incomplete", "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 6, "item" : null, "price" : null, "quantity" : null }]);
		expect($c.joinRight($c.duplicate(arrLookup,true),$c.duplicate(arrLookupJoiner,true),"_id")).toEqual([
			{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120, "item" : "abc", "price" : 12, "quantity" : 2 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80, "item" : "jkl", "price" : 20, "quantity" : 1 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70, "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 5, "sku": null, description: "Incomplete", "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 6, "item" : null, "price" : null, "quantity" : null }]);
	});
	it('limit',function(){
		expect($c.limit(arrObjs,1)).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
	});
	it('map',function(){
		var temp = $c.duplicate(arrObjs,true);
		$c.map(temp,function(item){ item.p = 10; return item; });
		expect(temp).toEqual([
			{id:1,p:10,share:"shared", index: 10,std:4},
			{id:2,p:10,share:"shared", index : 20,std:4},
			{id:3,p:10,share:"shared", index: 30,std:4},
			{id:4,p:10, std:4}]);
	});
	it('mapReduce',function(){
		var reduceFunction1 = function(keyCustId, valuesPrices) {
			return $c.sum(valuesPrices);
		};
		var mapFunction1 = function() {
			$c.emit(this.cust_id, this.price);
		};
		var arr = [{
			_id: 1,
			cust_id: "abc123",
			ord_date: new Date("Oct 04, 2012"),
			status: 'A',
			price: 25,
			items: [ { sku: "mmm", qty: 5, price: 2.5 },
				{ sku: "nnn", qty: 5, price: 2.5 } ]
		},{
			_id: 2,
			cust_id: "abc123",
			ord_date: new Date("Oct 04, 2012"),
			status: 'A',
			price: 25,
			items: [ { sku: "mmm", qty: 5, price: 2.5 },
				{ sku: "nnn", qty: 5, price: 2.5 } ]
		},{
			_id: 1,
			cust_id: "abc124",
			ord_date: new Date("Oct 04, 2012"),
			status: 'B',
			price: 30,
			items: [ { sku: "ooo", qty: 5, price: 2.5 },
				{ sku: "ppp", qty: 5, price: 2.5 } ]
		}];
		expect($c.mapReduce(arr,mapFunction1,reduceFunction1)).toEqual([{_id:'abc123',value:50},{_id:'abc124',value:30}]);
		expect($c.mapReduce(arr,mapFunction1,reduceFunction1,{query:{cust_id:'abc123'}})).toEqual([{_id:'abc123',value:50}]);

		expect($c.mapReduce(arr,mapFunction1,reduceFunction1,{limit:1})).toEqual([{_id:'abc123',value:25}]);

		var rarr = [];
		expect($c.mapReduce(arr,mapFunction1,reduceFunction1,{out:rarr})).toBe(rarr);

		expect($c.mapReduce(arr,mapFunction1,reduceFunction1,{limit:1,finalize:function(){return {};}})).toEqual([{_id:'abc123',value:{}}]);
	});
	it('normalize',function(){
		var temp = $c.duplicate(arrObjs,true);
		expect($c.normalize(temp)).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,p:null,share:null, index:null,std:4}]);
	});
	it('remove',function(){
		//arrMix = [1,{},"adsf",10];
		var temp = $c.duplicate(arrMix,true);
		expect($c.remove(temp,"adsf")).toBe("adsf");
		expect(temp).toEqual([1,{},10]);
		expect($c.remove(temp,"adsf",function(){return 1;})).toEqual({});
		expect(temp).toEqual([1,10]);
	});
	it('removeAll',function(){
		var temp = $c.duplicate(arrObjs,true);
		$c.removeAll(temp);
		expect(temp).toEqual([]);
		expect($c.removeAll([])).toEqual([]);
		temp = $c.duplicate(arrObjs,true);
		$c.removeAll(temp,"10",function(item){ return item.p;});
		$c.removeAll(temp,"10",function(value){ return $c.indexOfAlt(this,value,function(item){ return item.p; }); });
		expect(temp).toEqual([
			{ id : 2, p : '20', share : 'shared', index : 20, std : 4 },
			{ id : 3, p : '30', share : 'shared', index : 30, std : 4 },
			{ id : 4, std : 4 }]);
	});
	it('removeAt',function(){
		var temp = $c.duplicate(arrObjs,true);
		expect($c.removeAt(temp,1)).toEqual({id:2,p:"20",share:"shared", index : 20,std:4});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);
	});
	it('replaceAt',function(){
		var temp = $c.duplicate(arrObjs,true);
		expect($c.replaceAt(temp,1,{id:5,p:"50",share:"shared", index : 50,std:4})).toEqual({id:2,p:"20",share:"shared", index : 20,std:4});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:5,p:"50",share:"shared", index : 50,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);
	});
	it('scramble',function(){
		var temp = $c.duplicate(arrObjs,true);
		expect($c.scramble(temp)).not.toEqual(arrObjs);
		expect(temp.length).toEqual(arrObjs.length);
	});
	it('sortBy',function(){
		var temp = $c.duplicate(arrSort,true);
		expect($c.sortBy(temp,'s')).toEqual( [{id:5, s:2},{id:4, s:3},{id:1, s:5},{id:2, s:5},{id:3, s:6}]);

		temp = $c.duplicate(arrSort,true);
		expect($c.sortBy(temp,['s','!id'])).toEqual( [{id:5, s:2},{id:4, s:3},{id:2, s:5},{id:1, s:5},{id:3, s:6}]);

		temp = $c.duplicate(arrSort,true);
		expect($c.sortBy(temp,'s,!id')).toEqual( [{id:5, s:2},{id:4, s:3},{id:2, s:5},{id:1, s:5},{id:3, s:6}]);

		temp = $c.duplicate(arrSort,true);
		expect($c.sortBy(temp,'s,!id', true)).toEqual([{id:3, s:6},{id:1, s:5},{id:2, s:5},{id:4, s:3},{id:5, s:2}]);

		temp = $c.duplicate(arrSort,true);
		var primer = function(val){ if ($c.isOdd(val)) { return val - 1;} return val;};
		expect($c.sortBy(temp,['s','id'],false,primer)).toEqual( [{id:4, s:3},{id:5, s:2},{id:1, s:5},{id:2, s:5},{id:3, s:6}]);

		var arr = ['a','b','c','d'], lookup = {a:{s:4},b:{s:3},c:{s:2},d:{s:1}};
		expect($c.sortBy(arr,['s'],false,null,lookup)).toEqual( ['d','c','b','a']);

		var lookup2 = {a:{s:"a"},b:{s:"B"},c:{s:"c"},d:{s:"d"}};
		expect($c.sortBy(arr,['s'],false,null,lookup2)).toEqual( ['b','a','c','d']);
		expect($c.sortBy(arr,['s'],false,null,lookup2,'i')).toEqual( ['a','b','c','d']);
	});
	it('stdev',function(){
		var arr = [1,2,3,4,5,6,7,8,9,0];
		var arr2 = [1,undefined,2,'',3,{},4,[],5,null,function(){},6,7,8,9,0];
		expect($c.stdev(arr,'asdf')).toBe(2.8722813232690143);
		expect($c.stdev(arr2,'asdf2')).toBe(2.8722813232690143);
	});
	it('sum',function(){
		expect($c.sum(arrMix)).toBe(11);
	});
	it('toSet',function(){
		var arr = $c.duplicate(arrStrings);
		arr.push("string 1");
		$c.toSet(arr);
		expect(arr).toEqual(arrStrings);
		arr = [{},{},{},{}];
		$c.toSet(arr);
		expect(arr).toEqual([{}]);
	});
	it('trim',function(){
		var arr = ["     string 1    ", "  string 2  ", " string 3 ", "string 4"];
		expect($c.trim(arr)).toEqual(["string 1","string 2","string 3","string 4"]);
		expect(arr).toEqual(["     string 1    ", "  string 2  ", " string 3 ", "string 4"]);
		$c.trim(arr, true);
		expect(arr).toEqual(["string 1","string 2","string 3","string 4"]);
	});
	it('update',function(){
		var temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{share:"shared"},{$set:{index:15}});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 15,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{share:"shared"},{$set:{index:15}},{multi:true});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 15,std:4},
			{id:2,p:"20",share:"shared", index : 15,std:4},
			{id:3,p:"30",share:"shared", index: 15,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{share:"shared"},{},{multi:true});
		expect(temp).toEqual([{}, {}, {}, {id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{share:"shared"},{});
		expect(temp).toEqual([
			{},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{share:"shared"},{$inc:{index:1}},{multi:true});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 11,std:4},
			{id:2,p:"20",share:"shared", index : 21,std:4},
			{id:3,p:"30",share:"shared", index: 31,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{share:"shared"},{$unset:{index:1}});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{share:"shared"},{$currentDate:{currentDate:1}});
		expect(temp[0].currentDate.toString()).toBe((new Date()).toString());
		delete temp[0].currentDate;
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);


		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{},{$min:{index:20},$max:{index:20},$mul:{std:2},$rename:{share:'shared'}},{multi:true});
		expect(temp).toEqual([
			{id:1,p:"10",shared:"shared", index: 20,std:8},
			{id:2,p:"20",shared:"shared", index : 20,std:8},
			{id:3,p:"30",shared:"shared", index: 20,std:8},
			{id:4,index:20,std:8}]);

		var arrArr = [
			{id:1,arr:[
				{ "id" : 1, "score" : 6 },
				{ "id" : 2, "score" : 9 }
			]}
		];
		temp = $c.duplicate(arrArr,true);
		$c.update(temp,{},{$push:{arr:{
			$each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ],
			$sort: { score: 1 }
		}}});
		expect(temp).toEqual([{id:1,arr:[
			{ "id" : 1, "score" : 6 },
			{ "id" : 5, "score" : 6 },
			{ "id" : 4, "score" : 7 },
			{ "id" : 3, "score" : 8 },
			{ "id" : 2, "score" : 9 }
		]}]);

		temp = $c.duplicate(arrArr,true);
		$c.update(temp,{},{$push:{arr:{
			$each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ],
			$slice: -2
		}}});
		expect(temp).toEqual([{id:1,arr:[
			{ id: 4, score: 7 }, { id: 5, score: 6 }
		]}]);

		temp = $c.duplicate(arrArr,true);
		$c.update(temp,{},{$push:{arr:{
			$each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ],
			$position: 1
		}}});
		expect(temp).toEqual([{id:1,arr:[
			{ "id" : 1, "score" : 6 },
			{ "id" : 3, "score" : 8 },
			{ "id" : 4, "score" : 7 },
			{ "id" : 5, "score" : 6 },
			{ "id" : 2, "score" : 9 }
		]}]);

		temp = $c.duplicate(arrArr,true);
		$c.update(temp,{},{$pop:{arr: -1}});
		expect(temp).toEqual([{id:1,arr:[
			{ "id" : 2, "score" : 9 }
		]}]);

		temp = $c.duplicate(arrArr,true);
		$c.update(temp,{},{$pop:{arr: 1}});
		expect(temp).toEqual([{id:1,arr:[
			{ "id" : 1, "score" : 6 }
		]}]);

		temp = [{ id: 1, scores: [ 0, 2, 5, 5, 1, 0 ] }];
		$c.update(temp,{},{$pullAll:{scores: [0,5]}});
		expect(temp).toEqual([{id:1,scores:[2,1]}]);

		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{nonexistant:"shared"},{$set:{index:15}},{upsert:true});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4},{index:15}]);

		temp = $c.duplicate(arrObjs,true);
		$c.update(temp,{nonexistant:"shared"},{index:15},{upsert:true});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4},{index:15}]);
	});
	it('upsert',function(){
		var temp = $c.duplicate(arrObjs,true);
		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,{id:1,p:"10",share:"shared", index: 10,std:4},"id")).toEqual({
			insertedIndexes:[],
			updatedIndexes:[],
			unchangedIndexes:[0],
			inserted: [],
			updated:[],
			unchanged:[{id:1,p:"10",share:"shared", index: 10,std:4}]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,{id:5,p:"10",share:"shared", index: 10,std:4},"id")).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
				{id:2,p:"20",share:"shared", index : 20,std:4},
				{id:3,p:"30",share:"shared", index: 30,std:4},
				{id:4,std:4},{id:5,p:"10",share:"shared", index: 10,std:4}]);
		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,{id:5,p:"10",share:"shared", index: 10,std:4},"id")).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]
		});

		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,{id:5,p:"10",share:"shared", index: 10,std:4},"id",function(doc,record){
			return true;
		})).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]
		});
		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,{id:1,p:"10",share:"shared", index: 10,std:4},"id",function(){return true;})).toEqual({
			insertedIndexes:[],
			updatedIndexes:[],
			unchangedIndexes:[0],
			inserted: [],
			updated:[],
			unchanged:[{id:1,p:"10",share:"shared", index: 10,std:4}]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,{id:1,p:"10",share:"shared", index: 10,std:4},"id",function(){return false;})).toEqual({
			insertedIndexes:[],
			updatedIndexes:[0],
			unchangedIndexes:[],
			inserted: [],
			updated:[{id:1,p:"10",share:"shared", index: 10,std:4}],
			unchanged:[]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);




		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,[{id:1,p:"10",share:"shared", index: 10,std:4}],"id")).toEqual({
			insertedIndexes:[],
			updatedIndexes:[],
			unchangedIndexes:[0],
			inserted: [],
			updated:[],
			unchanged:[{id:1,p:"10",share:"shared", index: 10,std:4}]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,[{id:5,p:"10",share:"shared", index: 10,std:4}],"id")).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4},{id:5,p:"10",share:"shared", index: 10,std:4}]);
		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,[{id:5,p:"10",share:"shared", index: 10,std:4}],"id")).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]
		});

		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,[{id:5,p:"10",share:"shared", index: 10,std:4}],"id",function(doc,record){
			return true;
		})).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]
		});
		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,[{id:1,p:"10",share:"shared", index: 10,std:4}],"id",function(){return true;})).toEqual({
			insertedIndexes:[],
			updatedIndexes:[],
			unchangedIndexes:[0],
			inserted: [],
			updated:[],
			unchanged:[{id:1,p:"10",share:"shared", index: 10,std:4}]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = $c.duplicate(arrObjs,true);
		expect($c.upsert(temp,[{id:1,p:"10",share:"shared", index: 10,std:4}],"id",function(){return false;})).toEqual({
			insertedIndexes:[],
			updatedIndexes:[0],
			unchangedIndexes:[],
			inserted: [],
			updated:[{id:1,p:"10",share:"shared", index: 10,std:4}],
			unchanged:[]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);
	});
	it('where',function(){
		var temp = $c.duplicate(arrObjs,true);
		expect($c.where(arrObjs,{share:"shared"})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4}]);

		expect($c.where(arrObjs,{index:{$eq:10}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect($c.where(arrObjs,{index:{$gt:20}})).toEqual([{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect($c.where(arrObjs,{index:{$lt:20}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect($c.where(arrObjs,{index:{$gte:20}})).toEqual([{id:2,p:"20",share:"shared", index : 20,std:4},{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect($c.where(arrObjs,{index:{$lte:20}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect($c.where(arrObjs,{index:{$ne:20}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect($c.where(arrObjs,{index:{$in:[10,20]}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect($c.where(arrObjs,{index:{$nin:[10,20]}})).toEqual([{id:3,p:"30",share:"shared", index: 30,std:4},{id:4,std:4}]);
		expect($c.where(arrObjs,{$and:[{std:4},{index:10}]})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect($c.where(arrObjs,{$and:[{std:5},{index:10}]})).toEqual([]);
		expect($c.where(arrObjs,{$or:[{index:20},{index:10}]})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect($c.where(arrObjs,{index:{ $not: { $gte: 20 }}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:4,std:4}]);
		expect($c.where(arrObjs,{$nor:[{index:20},{index:10}]})).toEqual([{id:3,p:"30",share:"shared", index: 30,std:4},{id:4,std:4}]);
		expect($c.where(arrObjs,{index:{$exists:true}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect($c.where(arrObjs,{index:{$exists:false}})).toEqual([{id:4,std:4}]);
		expect($c.where(arrObjs,{index:{$type:Number}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect($c.where(arrObjs,{index:{$mod:[3,2]}})).toEqual([
			{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect($c.where(arrObjs,{index:{$regex:/[12]/}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect($c.where(arrObjs,{$where:"this.index > 20"})).toEqual([
			{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect($c.where(arrObjs,{$where:function(){ return this.index < 20;}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect($c.where(arrObjs,function(){ return this.index < 20;})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect($c.where([{id:1,p:"10",share:"shared", index: 10,std:4,tags:['a','b']}],{tags:{$all:['b','a']}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4,tags:['a','b']}]);
		expect($c.where([{id:1,p:"10",share:"shared", index: 10,std:4,tags:['c','b']}],{tags:['b','a']})).toEqual([]);

		temp = [{ _id: 1, results: [ { product: "abc", score: 10 }, { product: "xyz", score: 5 } ] },
		{ _id: 2, results: [ { product: "xyz", score: 7 } ] },
		{ _id: 3, results: [ { product: "abc", score: 7 }, { product: "xyz", score: 8 } ] }];
		expect($c.where(temp, { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } })).toEqual([
			{"_id":3,"results":[{"product":"abc","score":7},{"product":"xyz","score":8}]}
		]);
		expect($c.where(temp, { results: { $size: 1 } })).toEqual([
			{ _id: 2, results: [ { product: "xyz", score: 7 } ] }
		]);
		expect($c.where(temp, { results: { $size: 0 } })).toEqual([]);
		expect($c.where(temp, { results: { $size: 2 } })).toEqual([
			{ _id: 1, results: [ { product: "abc", score: 10 }, { product: "xyz", score: 5 } ] },
			{"_id":3,"results":[{"product":"abc","score":7},{"product":"xyz","score":8}]}
		]);
		temp = [{ _id: 1, results:  { product: "abc", score: 10 } },{ _id: 2, results:  { product: "abcd", score: 10 } } ];
		expect($c.where(temp, {'results.product':'abc'})).toEqual([{ _id: 1, results:  { product: "abc", score: 10 } }]);
		expect($c.where(temp, {'_id':1,'results.product':'abcd'})).toEqual([]);
	});
});
describe ('Date', function () {
	it('format',function(){
		var date = new Date('1/8/2016 13:00:00');

		expect($c.format(date,'m/d/Y')).toBe("01/08/2016");

		// Day
		expect($c.format(date,'d')).toBe('08');
		expect($c.format(date,'%d')).toBe('08');
		expect($c.format(date,'D')).toBe('Fri');
		expect($c.format(date,'j')).toBe('8');
		expect($c.format(date,'l')).toBe('Friday');
		expect($c.format(date,'N')).toBe('5');
		expect($c.format(date,'S')).toBe('th');
		expect($c.format(date,'w')).toBe('5');
		expect($c.format(date,'%w')).toBe('6');
		expect($c.format(date,'z')).toBe('7');
		expect($c.format(date,'%j')).toBe('8');

		// Week
		expect($c.format(date,'W')).toBe('1');
		expect($c.format(date,'%U')).toBe('01');

		// Month
		expect($c.format(date,'F')).toBe('January');
		expect($c.format(date,'m')).toBe('01');
		expect($c.format(date,'%m')).toBe('01');
		expect($c.format(date,'M')).toBe('Jan');
		expect($c.format(date,'%M')).toBe('Jan');
		expect($c.format(date,'n')).toBe('1');
		expect($c.format(date,'t')).toBe('31');

		// Year
		expect($c.format(date,'L')).toBe('1');
		expect($c.format(date,'o')).toBe('2016');
		expect($c.format(date,'Y')).toBe('2016');
		expect($c.format(date,'%Y')).toBe('2016');
		expect($c.format(date,'y')).toBe('16');

		// Time
		expect($c.format(date,'a')).toBe('pm');
		expect($c.format(date,'A')).toBe('PM');
		expect($c.format(date,'B')).toBe('916');
		expect($c.format(date,'g')).toBe('1');
		expect($c.format(date,'G')).toBe('13');
		expect($c.format(date,'h')).toBe('01');
		expect($c.format(date,'H')).toBe('13');
		expect($c.format(date,'i')).toBe('00');
		expect($c.format(date,'s')).toBe('00');
		expect($c.format(date,'u')).toBe((date.getTime() * 1000).toString());
		expect($c.format(date,'%L')).toBe((date.getTime()).toString());

		// Timezone
		expect($c.format(date,'e')).toBe('Pacific Standard Time (North America)');
		expect($c.format(date,'I')).toBe('1');
		expect($c.format(date,'O')).toBe('-0800');
		expect($c.format(date,'P')).toBe('-08:00');
		expect($c.format(date,'T')).toBe('PST');
		expect($c.format(date,'Z')).toBe('480');

		// Other
		expect($c.format(date,'c')).toBe('2016-01-08T21:00:00.000Z');
		expect($c.format(date,'r')).toBe('Fri, 08 Jan 2016 13:00:00 -0800');
		expect($c.format(date,'U')).toBe('1452286800');

	});
	it('getDayOfYear',function(){
		expect($c.getDayOfYear(new Date('1/1/2016'))).toBe(1);
		expect($c.getDayOfYear(new Date('3/1/2016'))).toBe(61);
	});
	it('getWeek',function(){
		expect($c.getWeek(new Date('1/1/2016'))).toBe(1);
		expect($c.getWeek(new Date('1/8/2016'))).toBe(2);
		expect($c.getWeek(new Date('2/1/2016'))).toBe(6);
		expect($c.getWeek(new Date('2/7/2016'))).toBe(7);
		expect($c.getWeek(new Date('12/31/2016'))).toBe(53);
	});
	it('isValidDate',function(){
		var ndate = new Date('adsfaf');
		expect($c.isValidDate(ndate)).toBe(false);
		expect($c.isValidDate(new Date())).toBe(true);
	});
});
describe ('Number', function () {
	it('aboutEqualTo',function(){
		expect($c.aboutEqualTo(10,9,1)).toBe(true);
		expect($c.aboutEqualTo(10,9,1.1)).toBe(true);
		expect($c.aboutEqualTo(10,9,0.9)).toBe(false);
		expect($c.aboutEqualTo(8,9,1)).toBe(true);
		expect($c.aboutEqualTo(8,9,1.1)).toBe(true);
		expect($c.aboutEqualTo(8,9,0.9)).toBe(false);
		expect($c.aboutEqualTo(7,9,1.1)).toBe(false);
	});
	it('isOdd',function(){
		expect($c.isOdd(10)).toBe(false);
		expect($c.isOdd(9)).toBe(true);
	});
	it('isEven',function(){
		expect($c.isEven(10)).toBe(true);
		expect($c.isEven(9)).toBe(false);
	});

	it('toCurrencyNotation',function(){
		expect($c.toCurrencyNotation(1000)).toBe("1,000");
		expect($c.toCurrencyNotation(1000000)).toBe("1,000,000");
		expect($c.toCurrencyNotation(1000,'.')).toBe('1.000');
	});

});
describe ('Function', function () {
	function temp (par1,par2) {
		this.p = 1;
		this.p2 = 2;
	}
	it('getParameters',function(){
		expect($c.getParameters(temp)).toEqual(['par1','par2']);
	});
	it('getName',function(){
		expect($c.getName(temp)).toEqual('temp');
	});
	it('extends',function(){
		function cls(){
			this.p3 = 0;
		}
		cls.extends(temp);
		 //console.log(cls.extends(temp).toString(), (new cls()).p1, cls.prototype);
		var props = "",c = new cls();
		for (var prop in c) {
			if (prop != 'construct') {
				props += prop + ":" + c[prop] + ",";
			} else {
				props += "construct:foo,";
			}
		}
		//expect(new cls()).toEqual({p:1,p2:2,p3:0,construct:$c.foo});
		expect(props).toBe('p3:0,p:1,p2:2,construct:foo,');
	});
	it('on',function(){
		function testEmit() { return $c.emit('listener'); }
		$c.on(testEmit,'listener',function(){ return 'hello world'; });
		$c.on(testEmit,'listener',function(){ return 'hello world again'; });

		expect(testEmit()).toEqual(['hello world','hello world again']);
	});
	it('then',function(){
		function testNext() { return $c.next(); }
		$c.then(testNext,function(){ return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);
	});
	it('catch',function(){
		function testNext() { return $c.next(); }
		$c.then(testNext,function(){ throw 'adsf'; });
		$c.catch(testNext,function(){ return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);

	});
});
describe ('RegExp', function () {
	it('addFlags',function(){
		expect($c.addFlags(/a/,'gim').source).toBe((/a/gim).source);
		expect($c.addFlags(/a/,'igm').source).toBe((/a/igm).source);
		expect($c.addFlags(/a/,'g').source).toBe((/a/g).source);
		expect($c.addFlags(/a/,'i').source).toBe((/a/i).source);
		expect($c.addFlags(/a/,'m').source).toBe((/a/m).source);
	});
});
describe ('Object', function () {
	it('changes',function(){
		var obj1 = {id:1,prop1:"prop1",prop3:""};
		var obj2 = {id:2,prop1:"propupdated",prop2:"prop2"};
		expect($c.changes(obj1,obj2)).toEqual({
			$length:4,
			$add:['prop2'],
			$update:["id","prop1"],
			$delete:["prop3"],
			id:2,
			prop1:"propupdated",
			prop2:"prop2",
			prop3:null
		});

	});
	it('contains',function(){
		expect($c.contains("asdf","a")).toBe(true);
		expect($c.contains("asdf","e")).toBe(false);
		expect($c.contains("asdf",/^as/)).toBe(true);
		expect($c.contains("asdf",/ad/)).toBe(false);
		expect($c.contains(['q','b'],"b")).toBe(true);
		expect($c.contains(['q','b'],"c")).toBe(false);
		expect($c.contains(['q','b'],/b/)).toBe(true);
		expect($c.contains(['q','b'],['a','c'])).toBe(false);
		expect($c.contains(['q','b'],['a','q'])).toBe("q");
		expect($c.contains(['q','b'],'a',function(){ return 'a';})).toBe(true);
		expect($c.contains(['q','b'],function(val,prop,arr){ return val=='b';})).toBe(true);
		expect($c.contains({q:"asdf",b:"abbb"},"abbb")).toBe(true);
		expect($c.contains({q:"asdf",b:"abbb"},"asdfb")).toBe(false);
	});
	it('copyObject',function(){
		function B(){ this.hi = "hello"; }
		var b = new B();
		var tb = $c.copyObject(b);
		expect(tb).toEqual({hi:"hello"});
		expect(tb.constructor).not.toEqual(B);
	});
	it('duplicate',function(){
		var obj = {hi:"hello",bye:"ciao",o:{blah:''}};
		var tobj = $c.duplicate(obj);
		expect(tobj).not.toBe(obj);
		expect(tobj.o).toBe(tobj.o);
		tobj = $c.duplicate(obj,true);
		expect(tobj.o).not.toBe(obj.o);


		function B(){ this.hi = "hello"; }
		var b = new B();
		var tb = $c.duplicate(b);
		expect(tb).toEqual(b);
		expect(tb.constructor).toEqual(B);
	});
	it('eachProperty',function(){
		var arrp = [], arrv = [], obj = {a:"a1",b:'b1',c:'c1'};
		$c.eachProperty(obj, function(val,prop){
			arrp.push(prop);
			arrv.push(val);
		});
		expect(arrp).toEqual(['a','b','c']);
		expect(arrv).toEqual(['a1','b1','c1']);
	});
	it('equals',function(){
		expect($c.equals("s","s")).toBe(true);
		expect($c.equals("s","ss")).toBe(false);
		expect($c.equals(0,0)).toBe(true);
		expect($c.equals(1,2)).toBe(false);
		expect($c.equals({},{})).toBe(true);
		expect($c.equals({},{hi:''})).toBe(false);
		expect($c.equals({hi:'',bye:''},{hi:''},['hi'])).toBe(true);
		expect($c.equals([],[])).toBe(true);
		expect($c.equals([],[''])).toBe(false);

	});
	it('every',function(){
		expect($c.every(['a','b','c'],function(val,prop,arr){ return val; })).toBe(true);
		expect($c.every(['a','','c'],function(val,prop,arr){ return val; })).toBe(false);

		expect($c.every({a:'a',b:'b',c:'c'},function(val,prop,arr){ return val; })).toBe(true);
		expect($c.every({a:'a',b:'',c:'c'},function(val,prop,arr){ return val; })).toBe(false);

	});
	it('getClass',function(){
		function C1() {}
		var c = new C1();
		expect($c.getClass(c)).toBe("C1");
	});
	it('getProperty',function(){
		var o = {path:{path:"hello world",arr:[{foo:"bar"}]}};
		expect($c.getProperty(o,"path.path")).toBe("hello world");
		expect($c.getProperty(o,"path.arr.foo")).toBe(undefined);
		expect($c.getProperty(o,"path.arr.0.foo")).toBe("bar");
	});
	it('getValue',function(){
		var f = function(num){return (num || 0 ) + 1; };
		var n = 10;
		var s = "s";
		var o = {};
		var a = [];
		expect($c.getValue(f)).toBe(1);
		expect($c.getValue(n)).toBe(10);
		expect($c.getValue(s)).toBe("s");
		expect($c.getValue(o)).toEqual({});
		expect($c.getValue([])).toEqual([]);



		expect($c.getValue($c.foo,[-1],1)).toBe(1);
		expect($c.getValue(null,n)).toBe(10);
		expect($c.getValue(null,s)).toBe("s");
		expect($c.getValue(null,o)).toEqual({});
		expect($c.getValue(null,[])).toEqual([]);
	});
	it('has',function(){
		var obj = {hi:""};
		expect($c.has(obj,"hi")).toBe(true);
		expect($c.has(obj,"hasOwnProperty")).toBe(false);

	});
	it('isArray',function(){
		expect($c.isArray([])).toBe(true);
		expect($c.isArray(true)).toBe(false);
		expect($c.isArray(new Date())).toBe(false);
		expect($c.isArray({nodeType:1})).toBe(false);
		expect($c.isArray(2.001)).toBe(false);
		expect($c.isArray(function(){})).toBe(false);
		expect($c.isArray(function*(){})).toBe(false);
		expect($c.isArray(2)).toBe(false);
		expect($c.isArray((new Promise(function(){})))).toBe(false);
		expect($c.isArray({})).toBe(false);
		expect($c.isArray(/k/)).toBe(false);
		expect($c.isArray("")).toBe(false);
	});
	it('isBetween',function(){
		expect($c.isBetween(10,11,9)).toBe(false);
		expect($c.isBetween(10,9,11)).toBe(true);
		expect($c.isBetween(10,10,11)).toBe(false);
		expect($c.isBetween(10,10,11,true)).toBe(true);
		expect($c.isBetween("b","a","c")).toBe(true);
		expect($c.isBetween("b","b","c")).toBe(false);
		expect($c.isBetween("b","b","c",true)).toBe(true);
	});
	it('isBoolean',function(){
		expect($c.isBoolean([])).toBe(false);
		expect($c.isBoolean(true)).toBe(true);
		expect($c.isBoolean(new Date())).toBe(false);
		expect($c.isBoolean({nodeType:1})).toBe(false);
		expect($c.isBoolean(2.001)).toBe(false);
		expect($c.isBoolean(function(){})).toBe(false);
		expect($c.isBoolean(function*(){})).toBe(false);
		expect($c.isBoolean(2)).toBe(false);
		expect($c.isBoolean(new Promise(function(){}))).toBe(false);
		expect($c.isBoolean({})).toBe(false);
		expect($c.isBoolean(/k/)).toBe(false);
		expect($c.isBoolean("")).toBe(false);
	});
	it('isDate',function(){
		expect($c.isDate([])).toBe(false);
		expect($c.isDate(true)).toBe(false);
		expect($c.isDate(new Date())).toBe(true);
		expect($c.isDate({nodeType:1})).toBe(false);
		expect($c.isDate(2.001)).toBe(false);
		expect($c.isDate(function(){})).toBe(false);
		expect($c.isDate(function*(){})).toBe(false);
		expect($c.isDate(2)).toBe(false);
		expect($c.isDate(new Promise(function(){}))).toBe(false);
		expect($c.isDate({})).toBe(false);
		expect($c.isDate(/k/)).toBe(false);
		expect($c.isDate("")).toBe(false);

	});
	it('isDomElement',function(){
		var div = document.createElement('div');
		expect($c.isDomElement([])).toBe(false);
		expect($c.isDomElement(true)).toBe(false);
		expect($c.isDomElement(new Date())).toBe(false);
		expect($c.isDomElement(div)).toBe(true);
		expect($c.isDomElement(2.001)).toBe(false);
		expect($c.isDomElement(function(){})).toBe(false);
		expect($c.isDomElement(function*(){})).toBe(false);
		expect($c.isDomElement(2)).toBe(false);
		expect($c.isDomElement(new Promise(function(){}))).toBe(false);
		expect($c.isDomElement({})).toBe(false);
		expect($c.isDomElement(/k/)).toBe(false);
		expect($c.isDomElement("")).toBe(false);

	});
	it('isEmpty',function(){
		expect($c.isEmpty(function(){})).toBe(true);
		expect($c.isEmpty({})).toBe(true);
		expect($c.isEmpty([])).toBe(true);


		expect($c.isEmpty(function(){ var b; })).toBe(false);
		expect($c.isEmpty({hi:""})).toBe(false);
		expect($c.isEmpty([''])).toBe(false);
	});
	it('isFloat',function(){
		expect($c.isFloat([])).toBe(false);
		expect($c.isFloat(true)).toBe(false);
		expect($c.isFloat(new Date())).toBe(false);
		expect($c.isFloat({nodeType:1})).toBe(false);
		expect($c.isFloat(2.001)).toBe(true);
		expect($c.isFloat(function(){})).toBe(false);
		expect($c.isFloat(function*(){})).toBe(false);
		expect($c.isFloat(2)).toBe(true);
		expect($c.isFloat(new Promise(function(){}))).toBe(false);
		expect($c.isFloat({})).toBe(false);
		expect($c.isFloat(/k/)).toBe(false);
		expect($c.isFloat("")).toBe(false);

	});
	it('isFunction',function(){
		expect($c.isFunction([])).toBe(false);
		expect($c.isFunction(true)).toBe(false);
		expect($c.isFunction(new Date())).toBe(false);
		expect($c.isFunction({nodeType:1})).toBe(false);
		expect($c.isFunction(2.001)).toBe(false);
		expect($c.isFunction(function(){})).toBe(true);
		expect($c.isFunction(function*(){})).toBe(false);
		expect($c.isFunction(2)).toBe(false);
		expect($c.isFunction(new Promise(function(){}))).toBe(false);
		expect($c.isFunction({})).toBe(false);
		expect($c.isFunction(/k/)).toBe(false);
		expect($c.isFunction("")).toBe(false);

	});
	it('isGenerator',function(){
		expect($c.isGenerator([])).toBe(false);
		expect($c.isGenerator(true)).toBe(false);
		expect($c.isGenerator(new Date())).toBe(false);
		expect($c.isGenerator({nodeType:1})).toBe(false);
		expect($c.isGenerator(2.001)).toBe(false);
		expect($c.isGenerator(function(){})).toBe(false);
		expect($c.isGenerator(function*(){})).toBe(true);
		expect($c.isGenerator(2)).toBe(false);
		expect($c.isGenerator(new Promise(function(){}))).toBe(false);
		expect($c.isGenerator({})).toBe(false);
		expect($c.isGenerator(/k/)).toBe(false);
		expect($c.isGenerator("")).toBe(false);

	});
	it('isGeolocation',function(){
		function Geolocation () {};
		var g = new Geolocation();
		expect($c.isGeolocation([])).toBe(false);
		expect($c.isGeolocation(g)).toBe(true);
	});
	it('isInt',function(){
		expect($c.isInt([])).toBe(false);
		expect($c.isInt(true)).toBe(false);
		expect($c.isInt(new Date())).toBe(false);
		expect($c.isInt({nodeType:1})).toBe(false);
		expect($c.isInt(2.001)).toBe(false);
		expect($c.isInt(function(){})).toBe(false);
		expect($c.isInt(function*(){})).toBe(false);
		expect($c.isInt(2)).toBe(true);
		expect($c.isInt(new Promise(function(){}))).toBe(false);
		expect($c.isInt({})).toBe(false);
		expect($c.isInt(/k/)).toBe(false);
		expect($c.isInt("")).toBe(false);

	});
	it('isNumber',function(){
		expect($c.isNumber([])).toBe(false);
		expect($c.isNumber(true)).toBe(false);
		expect($c.isNumber(new Date())).toBe(false);
		expect($c.isNumber({nodeType:1})).toBe(false);
		expect($c.isNumber(2.001)).toBe(true);
		expect($c.isNumber(function(){})).toBe(false);
		expect($c.isNumber(function*(){})).toBe(false);
		expect($c.isNumber(2)).toBe(true);
		expect($c.isNumber(new Promise(function(){}))).toBe(false);
		expect($c.isNumber({})).toBe(false);
		expect($c.isNumber(/k/)).toBe(false);
		expect($c.isNumber("")).toBe(false);

	});
	it('isPromise',function(){
		expect($c.isPromise([])).toBe(false);
		expect($c.isPromise(true)).toBe(false);
		expect($c.isPromise(new Date())).toBe(false);
		expect($c.isPromise({nodeType:1})).toBe(false);
		expect($c.isPromise(2.001)).toBe(false);
		expect($c.isPromise(function(){})).toBe(false);
		expect($c.isPromise(function*(){})).toBe(false);
		expect($c.isPromise(2)).toBe(false);
		expect($c.isPromise(new Promise(function(){}))).toBe(true);
		expect($c.isPromise({})).toBe(false);
		expect($c.isPromise(/k/)).toBe(false);
		expect($c.isPromise("")).toBe(false);

	});
	it('isObject',function(){
		expect($c.isObject([])).toBe(false);
		expect($c.isObject(true)).toBe(false);
		expect($c.isObject(new Date())).toBe(false);
		expect($c.isObject({nodeType:1})).toBe(true);
		expect($c.isObject(2.001)).toBe(false);
		expect($c.isObject(function(){})).toBe(false);
		expect($c.isObject(function*(){})).toBe(false);
		expect($c.isObject(2)).toBe(false);
		expect($c.isObject(new Promise(function(){}))).toBe(false);
		expect($c.isObject({})).toBe(true);
		expect($c.isObject(/k/)).toBe(false);
		expect($c.isObject("")).toBe(false);

	});
	it('isRegExp',function(){
		expect($c.isRegExp([])).toBe(false);
		expect($c.isRegExp(true)).toBe(false);
		expect($c.isRegExp(new Date())).toBe(false);
		expect($c.isRegExp({nodeType:1})).toBe(false);
		expect($c.isRegExp(2.001)).toBe(false);
		expect($c.isRegExp(function(){})).toBe(false);
		expect($c.isRegExp(function*(){})).toBe(false);
		expect($c.isRegExp(2)).toBe(false);
		expect($c.isRegExp(new Promise(function(){}))).toBe(false);
		expect($c.isRegExp({})).toBe(false);
		expect($c.isRegExp(/k/)).toBe(true);
		expect($c.isRegExp("")).toBe(false);

	});
	it('isString',function(){
		expect($c.isString([])).toBe(false);
		expect($c.isString(true)).toBe(false);
		expect($c.isString(new Date())).toBe(false);
		expect($c.isString({nodeType:1})).toBe(false);
		expect($c.isString(2.001)).toBe(false);
		expect($c.isString(function(){})).toBe(false);
		expect($c.isString(function*(){})).toBe(false);
		expect($c.isString(2)).toBe(false);
		expect($c.isString(new Promise(function(){}))).toBe(false);
		expect($c.isString({})).toBe(false);
		expect($c.isString(/k/)).toBe(false);
		expect($c.isString("")).toBe(true);

	});
	it('itemCount',function(){
		var obj = {hi:""};
		expect($c.itemCount(obj)).toBe(1);
		expect($c.itemCount({})).toBe(0);
		expect($c.itemCount(undefined)).toBe(undefined);
	});
	it('keyOf',function(){
		expect($c.keyOf({hi:"hello",world:"worlds"},"worlds")).toBe("world");
		expect($c.keyOf({hi:"worlds",world:"worlds"},"worlds")).toBe("hi");
	});
	it('map',function(){
		var obj = {hi:"hello",world:"world",index:1};
		$c.map(obj,function(val){ return val += 10;});
		expect(obj).toEqual({hi:"hello10",world:"world10",index:11});
	});
	it('merge',function(){
		var obj1 = {id:1,prop1:"prop1"};
		var obj2 = {id:2,prop2:"prop2"};
		var merged = $c.merge(obj1,obj2);
		expect(merged).toBe(obj1);
		merged = $c.merge(obj1,obj2,{clone:true});
		expect(merged).not.toBe(obj1);
		obj1 = {id:1,prop1:"prop1"};
		obj2 = {id:2,prop2:"prop2"};
		expect($c.merge(obj1,obj2,{onlyShared:true,clone:true})).toEqual({id:2,prop1:"prop1"});
		expect($c.merge(obj1,obj2,{intersect:true,clone:true})).toEqual({id:2});
		obj1 = {id:1,prop1:{p1:"adsf"},arr:[]};
		obj2 = {id:2,prop1:{p2:";lkj"},arr:['1234']};
		expect($c.merge(obj1,obj2,{recurse:true})).toEqual({id:2,prop1:{p1:"adsf",p2:";lkj"},arr:['1234']});
	});
	it('setProperty',function(){
		var o = {};
		expect($c.setProperty(o,"path.path","hello world")).toBe(true);
		expect(o).toEqual({path:{path:"hello world"}});
		expect($c.setProperty(o,"path.arr.0.foo","bar")).toBe(true);
		expect(o).toEqual({path:{path:"hello world",arr:[{foo:"bar"}]}});
	});
	it('toStringAlt',function(){
		var obj = {hi:"hello ",place:"world"};
		expect($c.toStringAlt(obj)).toBe("&hi=hello &place=world");
		expect($c.toStringAlt(obj,"-")).toBe("&hi-hello &place-world");
		expect($c.toStringAlt(obj,"=","@")).toBe("@hi=hello @place=world");
		expect($c.toStringAlt(obj,"=","@",true)).toBe("@hi=hello%20@place=world");
	});
});
// TODO: HTMLElement
//describe ('HTMLElement',function(){
//	it('addClass',function(){
//
//	});
//	it('blur',function(){
//
//	});
//	it('change',function(){
//
//	});
//	it('click',function(){
//
//	});
//	it('contextmenu',function(){
//
//	});
//	it('dblclick',function(){
//
//	});
//	it('drag',function(){
//
//	});
//	it('dragend',function(){
//
//	});
//	it('dragenter',function(){
//
//	});
//	it('dragleave',function(){
//
//	});
//	it('dragover',function(){
//
//	});
//	it('dragstart',function(){
//
//	});
//	it('drop',function(){
//
//	});
//	it('focus',function(){
//
//	});
//	it('formchange',function(){
//
//	});
//	it('forminput',function(){
//
//	});
//	it('getContainer',function(){
//
//	});
//	it('hasClass',function(){
//
//	});
//	it('height',function(){
//
//	});
//	it('hide',function(){
//
//	});
//	it('insertAfter',function(){
//
//	});
//	it('input',function(){
//
//	});
//	it('insertAlphabetically',function(){
//
//	});
//	it('insertAt',function(){
//
//	});
//	it('invalid',function(){
//
//	});
//	it('isOrphan',function(){
//
//	});
//	it('keydown',function(){
//
//	});
//	it('keypress',function(){
//
//	});
//	it('keyup',function(){
//
//	});
//	it('left',function(){
//
//	});
//	it('mousedown',function(){
//
//	});
//	it('mousemove',function(){
//
//	});
//	it('mouseout',function(){
//
//	});
//	it('mouseover',function(){
//
//	});
//	it('mouseup',function(){
//
//	});
//	it('mousewheel',function(){
//
//	});
//	it('moveDown',function(){
//
//	});
//	it('moveUp',function(){
//
//	});
//	it('on',function(){
//
//	});
//	it('remove',function(){
//
//	});
//	it('removeClass',function(){
//
//	});
//	it('replace',function(){
//
//	});
//	it('reset',function(){
//
//	});
//	it('scroll',function(){
//
//	});
//	it('select',function(){
//
//	});
//	it('show',function(){
//
//	});
//	it('submit',function(){
//
//	});
//	it('toggle',function(){
//
//	});
//	it('top',function(){
//
//	});
//	it('toString',function(){
//
//	});
//	it('unbind',function(){
//
//	});
//	it('width',function(){
//
//	});
//});
describe ('Global classes', function () {
	var arr = [1,2,4,5,6],
		obj = {p1:1,p2:2,p4:4,p5:5,p6:6},
		oarr = [{p:1},{p:2},{p:4},{p:5},{p:6}],
		setarr = [{p:1},{p:2},{p:4},{p:5},{p:5},{p:6}];
	// TO/DO Benchmarker
	//it('Benchmarker',function(){
	//
	//});
	it('Cursor',function(){
		var cursor = new $c.Cursor(arr);
		expect(cursor.current).toBe(1);
		expect(cursor.hasNext()).toBe(true);
		cursor.setNextIndex(10);
		expect(cursor.hasNext()).toBe(true);
		expect(cursor.next()).toEqual({value:6,done:true});
		expect(cursor.current).toBe(6);
		expect(cursor.hasNext()).toBe(false);
		cursor.setNextIndex(-10);
		expect(cursor.hasNext()).toBe(true);
		expect(cursor.current).toBe(1);
		expect(cursor.next()).toEqual({value:1,done:false});
		expect(cursor.current).toBe(1);


		cursor = new $c.Cursor(obj);
		expect(cursor.current).toBe(1);
		expect(cursor.hasNext()).toBe(true);
		cursor.setNextIndex(10);
		expect(cursor.hasNext()).toBe(true);
		expect(cursor.next()).toEqual({value:6,done:true});
		expect(cursor.current).toBe(6);
		expect(cursor.hasNext()).toBe(false);
		cursor.setNextIndex(-10);
		expect(cursor.hasNext()).toBe(true);
		expect(cursor.current).toBe(1);
		expect(cursor.next()).toEqual({value:1,done:false});
		expect(cursor.current).toBe(1);
	});
	it('OrderedList',function(){
		var ol = new $c.OrderedList(arr);
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:1,done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:2,done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:4,done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:5,done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:6,done:true});
		expect(ol.add(3)).toEqual(true);
		expect(ol.length).toEqual(6);
		expect(ol[2]).toBe(3);



		ol = new $c.OrderedList(oarr,function(a,b){if (a.p < b.p) {return -1;}if (a.p > b.p) {return 1;}return 0;});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:1},done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:2},done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:4},done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:5},done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:6},done:true});
		expect(ol.add({p:3})).toEqual(true);
		expect(ol.length).toEqual(6);
		expect(ol[2].p).toBe(3);
	});
	it('Queue',function(){
		var queue = new $c.Queue(oarr);
		expect([].concat(queue)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
		expect(queue.hasNext()).toBe(true);
		queue.enqueue({p:7});
		expect([].concat(queue)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6},{p:7}]);
		expect(queue.dequeue()).toEqual({p:1});
		expect([].concat(queue)).toEqual([{p:2},{p:4},{p:5},{p:6},{p:7}]);
		expect(queue.next()).toEqual({value:{p:2},done:false});
		expect(queue.next()).toEqual({value:{p:4},done:false});
		expect(queue.next()).toEqual({value:{p:5},done:false});
		expect(queue.next()).toEqual({value:{p:6},done:false});
		expect(queue.next()).toEqual({value:{p:7},done:true});
	});
	it('Set',function(){
		var set = new $c.Set(setarr);
		expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
		expect(set.hasNext()).toBe(true);
		expect(set.push({p:1})).toBe(6);
		expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6},{p:1}]);
		set.clean();
		expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
		expect(set.next()).toEqual({value:{p:1},done:false});
		expect(set.next()).toEqual({value:{p:2},done:false});
		expect(set.next()).toEqual({value:{p:4},done:false});
		expect(set.next()).toEqual({value:{p:5},done:false});
		expect(set.next()).toEqual({value:{p:6},done:true});
		set.clear();
		expect([].concat(set)).toEqual([]);
	});
});
describe ('Global http methods', function () {
	it('$COOKIE',function(){
		$COOKIE("cookie1","100000");
		expect($COOKIE("cookie1")).toBe("100000");
		$COOKIE("cookie1",{'delete':true});
		expect($COOKIE("cookie1")).toBe(false);
	});
	it('$DELETE,$GET,$SET,$COMMIT,$ROLLBACK',function(){
		$SET({'@hello':'world'},'defer');
		expect($GET('hello','defer')).toBe('world');
		expect($GET('hello')).toBe(false);
		$ROLLBACK();
		expect($GET('hello','defer')).toBe(false);
		$SET({'@hello':'world'},'defer');
		expect($GET('hello','defer')).toBe('world');
		$COMMIT();
		expect($GET('hello')).toBe('world');
		expect($GET('hello','defer')).toBe(false);
		$DELETE('hello');
		expect($GET('hello')).toBe(false);
	});
	it('ChromVersion',function(){
		expect(ChromeVersion()).toBeGreaterThan(0);
	});
	it('FireFoxVersion',function(){
		expect(FirefoxVersion()).toBe(-1);
	});
	it('IEVersion',function(){
		expect(IEVersion()).toBe(-1);
	});
	it('OperaVersion',function(){
		expect(OperaVersion()).toBe(-1);
	});
	it('SafariVersion',function(){
		expect(SafariVersion()).toBe(-1);
	});
	it('isAmaya',function(){
		expect(isAmaya()).toBe(false);
	});
	it('isAndroid',function(){
		expect(isAndroid()).toBe(false);
	});
	it('isBlackBerry',function(){
		expect(isBlackBerry()).toBe(false);
	});
	it('isChrome',function(){
		expect(isChrome()).toBe(true);
	});
	it('isFirefox',function(){
		expect(isFirefox()).toBe(false);
	});
	it('isGecko',function(){
		expect(isGecko()).toBe(false);
	});
	it('isIE6',function(){
		expect(isIE6()).toBe(false);
	});
	it('isIE',function(){
		expect(isIE()).toBe(false);
	});
	it('isIPad',function(){
		expect(isIPad()).toBe(false);
	});
	it('isIPhone',function(){
		expect(isIPhone()).toBe(false);
	});
	it('isIPod',function(){
		expect(isIPod()).toBe(false);
	});
	it('isKHTML',function(){
		expect(isKHTML()).toBe(false);
	});
	it('isLinux',function(){
		expect(isLinux()).toBe(false);
	});
	it('isMac',function(){
		expect(isMac()).toBe(true);
	});
	it('isMobile',function(){
		expect(isMobile()).toBe(false);
	});
	it('isOpera',function(){
		expect(isOpera()).toBe(false);
	});
	it('isPalmOS',function(){
		expect(isPalmOS()).toBe(false);
	});
	it('isPresto',function(){
		expect(isPresto()).toBe(false);
	});
	it('isPrince',function(){
		expect(isPrince()).toBe(false);
	});
	it('isSafari',function(){
		expect(isSafari()).toBe(false);
	});
	it('isSymbian',function(){
		expect(isSymbian()).toBe(false);
	});
	it('isTrident',function(){
		expect(isTrident()).toBe(false);
	});
	it('isWebkit',function(){
		expect(isWebkit()).toBe(true);
	});
	it('isWindows',function(){
		expect(isWindows()).toBe(false);
	});
	it('isWindowsMobile',function(){
		expect(isWindowsMobile()).toBe(false);
	});

});
describe ('Global methods', function () {
	beforeEach(function() {
		jasmine.addMatchers({
			toMatchPropAndConstructor: function (expected) {
				if (expected === undefined) {
					expected = {};
				}
				for (var prop in this.actual) {
					if (!this.actual.hasOwnProperty(prop)) { continue; }
					if (expected[prop] == undefined || expected[prop].constructor != this.actual[prop].constructor) {
						return false;
					}
				}
				return true;
			}
		});
	});
	var usersdata = {
		users: [{username: 'mtglass', name: 'Mark Glass', age: 10},
			{username: 'urdum', name: 'Ursula Dumfry', age: 10},
			{username: 'hydere', name: 'Henry Dere', age: 10},
			{username: 'cumhere', name: 'Cass Umhere', age: 10},
			{username: 'bstill', name: 'Bob Stillman', age: 10},
			{username: 'cirfuksalot', name: 'Camron', age: 10},
			{username: 'chadden', name: 'Corey Hadden', age: 30},
			{username: 'squeeb', name: 'Joseph Esquibel', age: 32},
			{username: 'cinada', name: 'Clark Inada', age: 31},
			{username: 'shurliezalot', name: 'Josh N', age: 10},
			{username: 'noze_nutin', name: 'Mai Boss', age: 10},
			{username: 'czass', name: 'Cater Zass', age: 10},
			{username: 'awesome_game', name: 'clash of clans', age: 21}]
	};
	it('addObjectPrototype',function(){
		expect($c.addObjectPrototype("addingProperty",function(){ return "hello world!";},true)()).toBe('hello world!');
		var obj = {},props;
		expect(obj.addingProperty()).toBe('hello world!');
		for (var prop in obj) { props.push(prop); }
		expect($c.contains(props,"addingProperty")).toBe(false);

	});
	it('ajax1',function(done) {
		$c.ajax({
			url: "users.json",
			onsuccess: function (data, hitch, req, ctx, status_code) {
				expect(data).toEqual(usersdata);
				expect(status_code).toBe(200);
				done();
			}
		});
	});
	it('ajax2',function(done){
		var errored = false, prm1 = $c.ajax({
			url: "userss.json",
			onsuccess:function(data,hitch,req,ctx,status_code){
				expect('Should not execute').toBe(true);
				done();
			},
			onerror:function(data,hitch,req,ctx,status_code){
				expect(status_code).toBe(404);
				expect(errored).toBe(false);
				errored = true;
				done();
			}
		});
		prm1.otherwise(function(data,hitch,req,ctx,status_code){
			expect(status_code).toBe(404);
			expect(errored).toBe(true);
			done();
		});
	});
	it('ajax3',function(done){

		var stage = 0,
			hobj = {hitch:true},
			ctx = {thectx:true};
		var prm2 = $c.ajax({
			url: "users.json",
			query:{a:"hello",b:"world"},
			hitch:hobj,
			context:ctx,
			onbefore:function(request,hitch,thiz){
				expect(stage++).toBe(0);
				expect(hitch).toBe(hobj);
				expect(thiz).toBe($c);
				expect(this).toBe(ctx);
			},
			oncomplete:function(data,hitch,req,ctx,status_code){
				expect(stage++).toBe(3);
				expect(hitch).toBe(hobj);
				expect(data).toEqual(usersdata);
				expect(this).toBe(ctx);
				expect(status_code).toBe(200);
			},
			onsuccess:function(data,hitch,req,ctx,status_code){
				expect(stage++).toBe(1);
				expect(hitch).toBe(hobj);
				expect(data).toEqual(usersdata);
				expect(this).toBe(ctx);
				expect(status_code).toBe(200);
			},
			onerror:function(){
				console.log(arguments,error);
			}
		});
		prm2.then(function(data,hitch,req,ctx,status_code){
			expect(stage++).toBe(2);
			expect(data).toEqual(usersdata);
			expect(ctx).toBe(ctx);
			expect(status_code).toBe(200);
		});

		prm2.finally(function(data,hitch,req,ctx,status_code){
			expect(stage++).toBe(4);
			expect(hitch).toBe(hobj);
			expect(data).toEqual(usersdata);
			expect(this).toBe(ctx);
			expect(status_code).toBe(200);
			done();
		});
	});
	it('cuid',function(){
		expect($c.cuid().length).toBe(36);
	});
	it('emit',function(){
		function testEmit() { return $c.emit('listener',1,2); }
		$c.on(testEmit,'listener',function(f,s){ return 'hello world' + (f+s); });
		$c.on(testEmit,'listener',function(f,s){ return 'hello world again' + (s-f); });

		expect(testEmit()).toEqual(['hello world3','hello world again1'])
	});
	it('fillTemplate',function(){
		var obj = [{arr:[{hi:"b"},{hi:"c"}],name:"operation"},{arr:[{hi:"b"},{hi:"c"}],name:"operation"}],
		obj2 = {arr:['monday','tuesday']},
		obj3 = {a:'monday',b:'tuesday'},
		obj4 = {a:'monday',b:'tuesday',hello:'world'},
		obj5 = {a:'monday',b:'tuesday',hello:'bite'},
		simple = {hello:"world"},
		simple2 = {a:{hello:"world"}};
		$c.TEMPLATE_VARS.push({variable:"TNAME",value:"this template var"});
		expect($c.fillTemplate("<div>${name}<div>${foreach ${item} in ${arr}}${item.hi}8888${name}9999${end foreach}</div></div>",obj))
			.toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
		expect($c.fillTemplate("<div>${TNAME}<div>")).toBe("<div>this template var<div>");
		expect($c.fillTemplate("<div ${dataproperties}>${hello}<div>",simple)).toBe("<div data-hello='world' >world<div>");
		expect($c.fillTemplate("<div>${this.a.hello}${index}<div>",simple2)).toBe("<div>world0<div>");
		expect($c.fillTemplate("<div>${COUNT[${arr}]}<div>",obj)).toBe("<div>2<div><div>2<div>");
		expect($c.fillTemplate("<div>${ENUM[${arr};]}<div>",obj2)).toBe("<div>monday, tuesday<div>");
		expect($c.fillTemplate("<div>${ENUM[${this};\"?\";[\"{ENUM_VAL}-\",\"-{ENUM_VAR}\"]]}<div>",obj3)).toBe("<div>monday-a-a?tuesday-b-b<div>");
		expect($c.fillTemplate("<div>${${novar}||${hello}}<div>",simple)).toBe("<div>world<div>");
		expect($c.fillTemplate("<div>${${hello}||${novar}}<div>",simple)).toBe("<div>world<div>");
		expect($c.fillTemplate("<div>${${novar}&&${hello}}<div>",simple)).toBe("<div><div>");
		expect($c.fillTemplate("<div>${${hello}&&'hello'}<div>",simple)).toBe("<div>hello<div>");
		expect($c.fillTemplate("<div>${function add (a,b) { return a+b; }|1|2}<div>",simple)).toBe("<div>3<div>");
		$g.tempFunc = function (o) { return o.a + " & " + o.b; }
		expect($c.fillTemplate("<div>${RUN[tempFunc;${this}]}<div>",obj3)).toBe("<div>monday & tuesday<div>");
		expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",obj3)).toBe("<div><a>monday</a></div>");
		expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",{hi:"hello"})).toBe("<div><span>hello</span></div>");
		expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",{bye:"bbye"})).toBe("<div><p>bbye</p></div>");
		expect($c.fillTemplate("<div>${name}<div>${for ${i=0,len=${arr}.length};${i<len};${i++}}${${arr}[i].hi}8888${name}9999${end for}</div></div>",obj))
				.toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
		expect($c.fillTemplate("<div>${name}<div>${declare i=0,len=${arr}.length}${while (${i}<${len})}${${arr}[i].hi}8888${name}9999${i++,null}${end while}</div></div>",obj))
				.toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
		expect($c.fillTemplate("<div>${script}var a = 0;a += 20;echo('${a} number is: ');echo(a);echo(10);${end script}<div>",obj3)).toBe("<div>monday number is: 2010<div>");
		expect($c.fillTemplate("<div>${try}echo('asdf');var a = null; a.foo;${catch (e)}echo(e);${finally}echo('finallyy')${end try}<div>",obj3)).toBe("<div>asdfError: TypeError: Cannot read property 'foo' of nullfinallyy<div>");
		expect($c.fillTemplate("<div>" +
				"${switch (${hello})}" +
					"${case 'world':}<span>${a}</span>" +
					"${case 'bite':}<p>${b}</p>" +
					"${break}" +
					"${case 'me':}<a>${a}</a>" +
					"${default}<div>${b}</div>" +
				"${end switch}</div>",obj3)).toBe("<div><div>tuesday</div></div>");
		expect($c.fillTemplate("<div>" +
				"${switch (${hello})}" +
					"${case 'world':}<span>${a}</span>" +
					"${case 'bite':}<p>${b}</p>" +
					"${break}" +
					"${case 'me':}<a>${a}</a>" +
					"${default}<div>${b}</div>" +
				"${end switch}</div>",obj4)).toBe("<div><span>monday</span><p>tuesday</p></div>");
		expect($c.fillTemplate("<div>" +
				"${switch (${hello})}" +
					"${case 'world':}<span>${a}</span>" +
					"${case 'bite':}<p>${b}</p>" +
					"${break}" +
					"${case 'me':}<a>${a}</a>" +
					"${default}<div>${b}</div>" +
				"${end switch}</div>",obj5)).toBe("<div><p>tuesday</p></div>");
		expect($c.fillTemplate('${foreach ${item} in ${this.DATA.page}}${if (${true})}<div>${item.name}</div>${end if}${end foreach}',
				{DATA:{page:[{name:'name1'},{name:'name2'}]}})).toBe('<div>name1</div><div>name2</div>');
	});
	it('isNull',function(){
		expect($c.isNull(undefined)).toBe(true);
		expect($c.isNull(null)).toBe(true);
		expect($c.isNull(true)).toBe(false);
		expect($c.isNull("")).toBe(false);
		expect($c.isNull(4)).toBe(false);
		expect($c.isNull("adsf")).toBe(false);

		expect($c.isNull("adsf", "hello")).toBe("adsf");
		expect($c.isNull(null, "hello")).toBe("hello");
	});
	it('namespace',function(){
		expect($c.namespace("Test",function TestClass(){}).toString()).toEqual('function TestClass(){}');
		expect($c.getClass(new $c.namespaces.Test.TestClass())).toBe("TestClass");
		expect(Test).toBe('function TestClass(){}');
	});
	it('next',function(){
		function testNext() { return $c.next(1,2); }
		$c.then(testNext,function(f,s){ return 'hello world' + (f+s); });
		expect(testNext()).toEqual(['hello world3']);
	});
	it('now',function(){
		expect($c.now().getTime()).toBeCloseTo(new Date().getTime(),20);
		expect($c.now('m')).toBeCloseTo($c.format(new Date(),'m'),20);
	});
	it('parseBoolean',function(){
		expect($c.parseBoolean("true")).toBe(true);
		expect($c.parseBoolean(true)).toBe(true);
		expect($c.parseBoolean("1")).toBe(true);
		expect($c.parseBoolean("0")).toBe(false);
		expect($c.parseBoolean(1)).toBe(true);
		expect($c.parseBoolean(0)).toBe(false);
		expect($c.parseBoolean("false")).toBe(false);
		expect($c.parseBoolean(false)).toBe(false);
		expect($c.parseBoolean(undefined)).toBe(undefined);
		expect($c.parseBoolean(null)).toBe(undefined);
		expect($c.parseBoolean("adfad")).toBe(undefined);
		expect($c.parseBoolean("")).toBe(undefined);
	});
	it('parseRaw',function(){
		expect($c.parseRaw("str")).toBe("\"str\"");
		expect($c.parseRaw({})).toBe("{}");
		expect($c.parseRaw([])).toBe("[]");

		expect($c.parseRaw("str",true)).toBe("str");
		expect($c.parseRaw(function(){},true)).toBe("function (){}");
		expect($c.parseRaw(function*(){},true)).toBe("function* (){}");
	});
	it('rand',function(){
		var i = 0;
		while (i < 1000) {
			expect($c.isBetween($c.rand(1, 2, true), 1, 2, true)).toBe(true);
			expect($c.isBetween($c.rand(1, 2), 1, 2)).toBe(true);
			i++;
		}
	});
	it('suid',function(){
		expect($c.suid().length).toBe(10);
		expect($c.suid(5).length).toBe(5);
	});
	it('syncroit',function(done){
		$c.syncroit(function *() {
			var resolve = true;
			function testPromise(){
				return new Promise(function(res,rej){
					if (resolve) { return res({resolve:resolve}); }
					return rej({resolve:resolve});
				});
			}
			expect(yield testPromise()).toEqual({resolve:true});

			resolve = false;
			expect(yield testPromise()).toEqual({resolve:false});

			expect(yield $c.ajax("users.json")).toEqual({ users:
					[ { username: 'mtglass', name: 'Mark Glass', age: 10 },
						{ username: 'urdum', name: 'Ursula Dumfry', age: 10 },
						{ username: 'hydere', name: 'Henry Dere', age: 10 },
						{ username: 'cumhere', name: 'Cass Umhere', age: 10 },
						{ username: 'bstill', name: 'Bob Stillman', age: 10 },
						{ username: 'cirfuksalot', name: 'Camron', age: 10 },
						{ username: 'chadden', name: 'Corey Hadden', age: 30 },
						{ username: 'squeeb', name: 'Joseph Esquibel', age: 32 },
						{ username: 'cinada', name: 'Clark Inada', age: 31 },
						{ username: 'shurliezalot', name: 'Josh N', age: 10 },
						{ username: 'noze_nutin', name: 'Mai Boss', age: 10 },
						{ username: 'czass', name: 'Cater Zass', age: 10 },
						{ username: 'awesome_game', name: 'clash of clans', age: 21 }]});
			done();
		});
	});
	it('tryEval',function(){
		expect($c.tryEval("{}")).toEqual({});
		expect($c.tryEval("{{}")).toEqual(null);
		expect($c.tryEval("4")).toEqual(4);
		expect($c.tryEval("\"s\"")).toEqual("s");
	});
	// TO/DO wait
	//it('wait',function(){
	//
	//});
	it('xmlToJson',function(){
		expect($c.xmlToJson('<?xml version="1.0" encoding="UTF-8" ?><employees att1="wwww"><employee att2="eeeewwww">22222<id>1</id>adsfa<firstName attrs="1"attr2="2">aadsf</firstName>1111<lastName>DiCaprio</lastName><photo>http://1.bp.blogspot.com/-zvS_6Q1IzR8/T5l6qvnRmcI/AAAAAAAABcc/HXO7HDEJKo0/s200/Leonardo+Dicaprio7.jpg</photo></employee><employee><id>2</id><firstName>Johnny</firstName><lastName>Depp</lastName><photo>http://4.bp.blogspot.com/_xR71w9-qx9E/SrAz--pu0MI/AAAAAAAAC38/2ZP28rVEFKc/s200/johnny-depp-pirates.jpg</photo></employee><employee><id>3</id><firstName>Hritik</firstName><lastName>Roshan</lastName><photo>http://thewallmachine.com/files/1411921557.jpg</photo></employee></employees>')).toEqual({
			employees : {
				employee : [{
					'#text' : '22222adsfa1111',
					id : '1',
					firstName : 'aadsf',
					lastName : 'DiCaprio',
					photo : 'http://1.bp.blogspot.com/-zvS_6Q1IzR8/T5l6qvnRmcI/AAAAAAAABcc/HXO7HDEJKo0/s200/Leonardo+Dicaprio7.jpg',
					'@attributes' : { att2 : 'eeeewwww' }
				},{
					id : '2',
					firstName : 'Johnny',
					lastName : 'Depp',
					photo : 'http://4.bp.blogspot.com/_xR71w9-qx9E/SrAz--pu0MI/AAAAAAAAC38/2ZP28rVEFKc/s200/johnny-depp-pirates.jpg'
				},{
					id : '3',
					firstName : 'Hritik',
					lastName : 'Roshan',
					photo : 'http://thewallmachine.com/files/1411921557.jpg'
				}],
				'#text' : '',
				'@attributes' : { att1 : 'wwww' }
			}
		});
	});
	// TO/DO zipit
	//it('zipit',function(){
	//
	//});

});
