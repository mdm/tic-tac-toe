class Match < ApplicationRecord
  belongs_to :noughts, class_name: 'Player'
  belongs_to :crosses, class_name: 'Player'
  has_many :moves

  def details
    { id: id, noughts: noughts.name, crosses: crosses.name }
  end

  def valid_move?(player, cell)
    return false if result != 'unknown'
    return false if player == noughts && accepted_moves.odd?
    return false if player == crosses && accepted_moves.even?

    move_at(cell).nil?
  end

  def move_at(cell)
    move_index = moves.find_index { |move| move.cell == cell }
    move_index.nil? ? nil : moves[move_index]
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

  def winner?
    finished_row? || finished_column? || finished_diagonal?
  end

  def determine_result  # rubocop:disable Metrics/MethodLength
    if winner?
      if accepted_moves.odd?
        'noughts'
      else
        'crosses'
      end
    elsif accepted_moves == 9
      'draw'
    else
      'unknown'
    end
  end
end
