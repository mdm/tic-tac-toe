module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :player

    def connect
      self.player = authenticated_player
    end

    private

    def authenticated_player # rubocop:disable Metrics/AbcSize
      # For simplicity we assume the browsers are the only clients. For them storing the JWT
      # http-only cookies (such as Rails sessions) provides some protection against XSS. Other
      # JWT sources could be allowed in the future (e.g. for mobile clients).
      if @request.session[:jwt].nil?
        reject_unauthorized_connection
      else
        decoded_token = JWT.decode @request.session[:jwt], Rails.application.credentials.jwt_secret, true,
                                   algorithm: 'HS512'
        return reject_unauthorized_connection if decoded_token[0]['exp'] < Time.now.to_i

        Player.find_by_name(decoded_token[0]['sub'])
      end
    rescue JWT::DecodeError
      reject_unauthorized_connection
    end
  end
end
