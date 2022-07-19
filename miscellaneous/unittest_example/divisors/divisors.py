
def findDivisors2357(num):
    """Function to find which out of 2,3,5,7 divide evenly into the numerical input."""

    result = []

    if num <= 0:
        pass

    else:
        if num % 2 == 0:
            result.append(2)
        if num % 3 == 0:
            result.append(3)
        if num % 5 == 0:
            result.append(5)
        if num % 7 == 0:
            result.append(7)

    return result
