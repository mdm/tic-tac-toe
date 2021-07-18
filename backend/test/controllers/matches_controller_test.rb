require "test_helper"

class MatchesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get matches_create_url
    assert_response :success
  end

  test "should get move" do
    get matches_move_url
    assert_response :success
  end
end
