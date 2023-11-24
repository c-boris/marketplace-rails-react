class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

    def sign_up_params
      params.require(:user).permit( :email, :password )
    end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      
      register_success
    else
      register_failed(resource)
    end
  end

    def register_success
      render json: { 
        message: 'Signed up sucessfully.',
        user: current_user},
        status: :ok
    end

    def register_failed(resource)
      render json: { message: "Registration failed.", errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end