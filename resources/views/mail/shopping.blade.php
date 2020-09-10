@component('mail::message')
# {{ $details['title'] }}
Thank you have order book of Book Shop.

  
@component('mail::table')

|Product Name                 |           QTY(cuốn)               |     Price(VND)       |          Address                             |             Phone                 |
|-------------------------|--------------------------------------------|-------------------------------|-----------------------|--------------|
@foreach ($billde->products as $bd)
|{{$bd['name']}}  |     {{$bd->pivot->quantity}}              |{{number_format($bd->pivot->price)}}| {{$bill->address}}|{{$bill->phone}}|
@endforeach



@endcomponent

   
Thanks,<br>
{{ $bill->user->name }}
{{ $details['url'] }}

@endcomponent
