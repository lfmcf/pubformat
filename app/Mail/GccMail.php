<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GccMail extends Mailable
{
    use Queueable, SerializesModels;

    private ?string $name = null;
    private ?string $comments = null;
    
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(?string $name, ?string $comments)
    {
        $this->name = $name;
        $this->comments = $comments;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->to(getenv('MAIL_TO'))
        ->subject("atlas new mail")
        ->attach(public_path($this->name))
        ->html($this->comments);
    }
}
