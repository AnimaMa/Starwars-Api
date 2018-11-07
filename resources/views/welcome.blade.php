<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">


    {{--<script src="https://unpkg.com/axios/dist/axios.min.js"></script>--}}
    {{--<script src="https://unpkg.com/vue@2.1.6/dist/vue.js"></script>--}}
    <link rel="stylesheet" type="text/css" href="{{ url('css/all.css') }}">


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


