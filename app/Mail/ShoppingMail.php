<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ShoppingMail extends Mailable
{
    use Queueable, SerializesModels;
    public $details;
    public $billde;
    public $bill;
   
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details, $billde, $bill)
    {
        $this->details = $details;
        $this->billde = $billde;
        $this->bill = $bill;
    }
   
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.shopping')
                    ->with('details', $this->details)
                    ->with('billde', $this->billde)
                    ->with('bill', $this->bill);
    }
}