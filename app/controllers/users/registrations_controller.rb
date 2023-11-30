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

  def update_profile
    user = current_user

    allowed_params = user_params.except(:client_id, :client_secret)

    # If email or password are not provided, use existing email and password
    allowed_params[:email] = user.email if allowed_params[:email].blank?
    allowed_params[:password] = user.password if allowed_params[:password].blank?

    if user.update_with_password(allowed_params)
      render json: render_user(user, client_app), status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
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

  def user_params
    params.permit(:email, :password, :password_confirmation, :current_password, :user_id)
  end

end