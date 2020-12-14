def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    one = dict()
    for letter in str(num1):
        one[letter] = str(num1).count(letter)

    two = dict()
    for letter in str(num2):
        two[letter] = str(num2).count(letter)

    if one == two:
        return True
    return False