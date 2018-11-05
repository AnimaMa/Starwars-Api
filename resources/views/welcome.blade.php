<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">


    {{--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>--}}
    {{--<script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>--}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.2.3/css/bulma.css">
    <link rel="stylesheet" type="text/css" href="{{ url('css/all.css') }}">
    <style>
        body {
            padding-top: 40px;
            transition: all 0.3s;
        }

        .button {
            display: block;
            width: 100px;
            margin-bottom: 15px;
            margin-top: 15px;
        }

        .button.red {
            background-color: lightcoral;
        }

        .flex {
            display: flex;
            min-width: 500px;
            max-width: 700px;

        }

        .box {
            flex: 0 0 50%;
        }

        .box .row {
            padding: 20px 10px;
            border-bottom: 1px lightgray solid;
            width: 100%;
            padding-bottom: 0;
        }

        .bold {
            font-weight: bold;
        }

        /*.box .row:nth-child(2) {*/
        /*background-color: lightblue;*/
        /*}*/

    </style>

</head>

<body>
<div id="app">


    <router-link to="/">Home</router-link>
    |
    <router-link to="/star">Star</router-link>


    <router-view></router-view>

</div>

@if(App::isLocal())
    <script src="/js/all.js"></script>
@else
    <script src="{{ elixir('js/all.js') }}"></script>
@endif

</body>
</html>


