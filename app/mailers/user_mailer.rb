class UserMailer < ApplicationMailer
      default from: 'alexisrichard3140@gmail.com'

  def welcome_email
    @user = params[:user]
    @url  = 'http://localhost:5173/login'
    mail(to: @user.email, subject: 'Welcome to our Market Place!')
  end
end
