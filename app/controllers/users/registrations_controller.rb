class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  def create
    super do |resource|
      if resource.persisted?
        # Action pour envoyer un e-mail de bienvenue après la création de l'utilisateur
        UserMailer.with(user: resource).welcome_email.deliver_later
      end
    end
  end
  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: {
      message: 'Signed up sucessfully.',
      user: current_user
    }, status: :ok
  end

  def register_failed
    render json: { message: 'Something went wrong.' }, status: :unprocessable_entity
  end
end