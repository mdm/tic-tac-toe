class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  before_action :set_csrf_cookie
  before_action :authenticate

  protect_from_forgery

  def authenticate
    # For simplicity we assume the browsers are the only clients. For them storing the JWT
    # http-only cookies (such as Rails sessions) provides some protection against XSS. Other
    # JWT sources could be allowed in the future (e.g. for mobile clients).
    return head :unauthorized if session[:jwt].nil?

    decoded_token = JWT.decode session[:jwt], Rails.application.credentials.jwt_secret, true, algorithm: 'HS512'
    @player = Player.find_by_name(decoded_token[0]['sub'])
  rescue JWT::DecodeError
    head :unauthorized
  end

  private

  def set_csrf_cookie
    cookies['CSRF-TOKEN'] = form_authenticity_token
  end
end
