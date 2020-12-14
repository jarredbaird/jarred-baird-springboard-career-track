def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return diagonal_sums of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    diagonal_sums = 0

    # right diag
    length = len(matrix)-1
    while length >= 0:
        diagonal_sums += matrix[length][length]
        length -= 1
    
    # left diag
    i = len(matrix)-1
    j = 0
    while i >= 0:
        diagonal_sums += matrix[i][j]
        i -= 1
        j += 1

    return diagonal_sums