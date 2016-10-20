<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>

  <link rel="shortcut icon" type="image/png" href="lib/jasmine-2.4.1/jasmine_favicon.png">
  <link rel="stylesheet" href="lib/jasmine-2.4.1/jasmine.css">

  <script src="https://cdn.jsdelivr.net/lodash/4.14.1/lodash.js"></script>
  <script src="lib/jasmine-2.4.1/jasmine.js"></script>
  <script src="lib/jasmine-2.4.1/jasmine-html.js"></script>
  <script src="lib/jasmine-2.4.1/boot.js"></script>

  <!-- include source files here... -->
  <script src="../craydent<?php echo '-' . ($_GET['version'] ? $_GET['version'] : ''); ?>.js"></script>
  <script>$c.DEBUG_MODE=true;console.log("***********************************"+$c.VERSION+"***********************************");document.getElementsByTagName('title')[0].innerHTML = 'Craydent v'+$c.VERSION;</script>

  <!-- include spec files here... -->
  <script src="spec/unit_test-spec.js"></script>
  <script>
  function bar() {

    var arr = [];

    for (var i = 0; i < 100000; i++) {
      arr.push({id: i + 1, value: "hello", v: "bye"});
    }
    arr.push({id: 0, value: "hello", v: "bye"});
    $g.arr = arr;
    //
    //
    //var start = $c.now(),iterations = 10000;
    //for (var j = 0; j < iterations; j++)
    //{
    //	$c.where(arr,{id:50});
    //}
    //
    //console.log(($c.now() - start)/iterations);
    //

    ////
    ////console.log(arr.indexOf(find(arr,'id',50)[0]),find(arr,'id',50)[0],find(arr,'id',50).length)
    ////
    ////var start = $c.now(),iterations = 10000;
    ////for (var j = 0; j < iterations; j++) {
    ////	var item = find(arr,'id',50)[0];
    ////	arr.indexOf(item);
    ////}
    ////
    ////console.log(($c.now() - start)/iterations);
    //return

    var iterations = 10000,
            query = {id: 50, value: "hello"},
//    query = { id : 50 },
            func = function (item) {
              return item.value == "hello" && item.id == 50;
            };
//    func = function(item){ return item.id == 50;};

    arr[0].v = "bbye";

    //**********************lodash ***********************************
    function dash() {
//      var _ = require('lodash');
      var lotimer = 0;
      for (var j = 0; j < iterations; j++) {
        var start = new Date();
        _.filter(arr, query);
        lotimer += new Date() - start;
      }
      console.log(lotimer / iterations, 'dash', _.filter(arr, query).length);
    }

    //**********************where ***********************************
    function swhere() {
      var whtimer = 0;
      for (var j = 0; j < iterations; j++) {
        var start = new Date();
        $c.where(arr, query);
        whtimer += new Date() - start;
      }
      console.log(whtimer / iterations, 'where', $c.where(arr, query).length);
    }

    //**********************indexed ***********************************
    function iwhere() {
      var start = new Date();
      var itimer = 0;
      $c.createIndex(arr, ['id', 'value']);
      console.log(new Date() - start, 'indexed completed');
      for (var j = 0; j < iterations; j++) {
        var start = new Date();
        $c.where(arr, query);
        itimer += new Date() - start;
      }
      console.log(itimer / iterations, 'indexed', $c.where(arr, query).length);
    }

    //**********************filter ***********************************
    function native() {
      var fitimer = 0;
      for (var j = 0; j < iterations; j++) {
        var start = new Date();
        arr.filter(func);
        fitimer += new Date() - start;
      }

      console.log(fitimer / iterations, 'filter', arr.filter(func).length);
    }

    //console.log(lotimer,whtimer,fitimer,itimer);

    //**********************where complex ***********************************
    function cwhere() {
      var whctimer = 0;
      for (var j = 0; j < iterations; j++) {
        var start = new Date();
        $c.where(arr, {id: {$lt: 20}});
        whctimer += new Date() - start;
      }
      console.log(whctimer / iterations, 'mongo where', $c.where(arr, {id: {$lt: 20}}).length);
    }


    console.log("**************** {id:50, value: \"hello\"} ****************");
    cwhere();
    swhere();
    iwhere();
    native();
    dash();

    query = {id: 50};
    func = function (item) {
      return item.id == 50;
    };
    delete arr.__indexes;
    console.log("**************** {id:50} ****************");
    cwhere();
    swhere();
    iwhere();
    native();
    dash();
  }
    //bar();
  </script>

</head>

<body>
</body>
</html>
