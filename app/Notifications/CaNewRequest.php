<?php

namespace App\Notifications;

use App\Models\NewRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class CaNewRequest extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $request;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $request)
    {
        $this->request = $request;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'from' => $this->request
            // 'form' => $this->request['form'],
            // 'region' => $this->request['region'],
        ];
    }

    public function toBroadcast($notifiable): BroadcastMessage
    {
        
        return new BroadcastMessage([
            'from' => $this->request
            // 'form' => $this->request['form'],
            // 'region' => $this->request['region'],
        ]);
    }
}
