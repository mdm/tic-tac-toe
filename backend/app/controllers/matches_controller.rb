class MatchesController < ApplicationController
  def create
    players = [@player, match_params[:opponent]]
    players.shuffle!
    match = Match.create(noughts: players[0], crosses: player[1], accepted_moves: 0, finished: false)
    render json: match
  end

  def move # rubocop:disable Metrics/AbcSize
    @match = Match.find(move_params[:match])
    return invalid_move if @player == @match.noughts && @match.accepted_moves.odd?
    return invalid_move if @player == @match.crosses && @match.accepted_moves.even?
    return invalid_move unless move_at(move_params[:cell]).nil?

    Move.create(match: @match, number: @match.accepted_moves, cell: move_params[:cell])

    @match.accepted_moves += 1
    @match.finished = finished?
    @match.save

    MoveChannel.broadcast_to @match, { event: 'move', player: @player.name, cell: move_params[:cell] }
    valid_move
  end

  private

  def match_params
    params.require(:opponent)
  end

  def move_params
    params.require(:match, :cell)
  end

  def valid_move
    render json: { accepted: true, finished: @match.finished }
  end

  def invalid_move
    render json: { accepted: false, finished: @match.finished }
  end

  def move_at(cell)
    @match.moves.find_index { |move| move.cell == cell }
  end

  def same_color?(cells)
    all_noughts = cells.none? do |cell|
      move = move_at(cell)
      move.nil? || move.number.odd?
    end

    all_crosses = cells.none? do |cell|
      move = move_at(cell)
      move.nil? || move.number.even?
    end

    all_noughts || all_crosses
  end

  def finished_row?
    (0..2).each do |row|
      cells = (0..2).map { |column| row * 3 + column }
      return true if same_color?(cells)
    end

    false
  end

  def finished_column?
    (0..2).each do |column|
      cells = (0..2).map { |row| row * 3 + column }
      return true if same_color?(cells)
    end

    false
  end

  def finished_diagonal?
    cells = (0..2).map { |i| i * 3 + i }
    return true if same_color?(cells)

    cells = (0..2).map { |i| (2 - i) * 3 + i }
    return true if same_color?(cells)

    false
  end

  def finished?
    finished_row? || finished_column? || finished_diagonal?
  end
end
