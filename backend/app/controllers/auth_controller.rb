class AuthController < ApplicationController
  before_action :authenticate, only: [:check]
  
  protect_from_forgery only: [:check]

  JWT_VALID_FOR_SECONDS = 60 * 60

  def login # rubocop:disable Metrics/AbcSize
    @player = Player.find_by_name(params[:name])
    if @player.nil?
      @player = Player.create(player_params)
      session[:jwt] = player_jwt
      head :created
    elsif @player.authenticate(params[:password])
      session[:jwt] = player_jwt
    else
      head :unauthorized
    end
  end

  def logout
    reset_session
  end

  def check
    session[:jwt] = player_jwt
  end

  private

  def player_params
    params.permit(:name, :password)
  end

  def player_jwt
    exp = Time.now.to_i + JWT_VALID_FOR_SECONDS
    payload = {
      "sub": @player.name,
      "exp": exp
    }

    JWT.encode payload, Rails.application.credentials.jwt_secret, 'HS512'
  end
end
