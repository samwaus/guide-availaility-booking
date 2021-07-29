import AvailabilityService from '../services/AvailabilityService';

class Availability {
  /**
   * Creates a new availability record
   *
   * @param req Express.Request
   * @param res Express.Response
   */
  // @ts-ignore
  static async apiCreateAvailability(req, res): object {
    try {
      const createdAvailability = await AvailabilityService.createAvailability(
        req.body
      );
      res.json(createdAvailability);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /**
   * Retrieves an availability record by user ID
   *
   * @param req Express.Request
   * @param res Express.Response
   */
  // @ts-ignore
  static async apiGetAvailabilityByUserId(req, res): object {
    try {
      let id = req.params.id || {};
      const availability = await AvailabilityService.getAvailability(id);
      res.json(availability);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /**
   * Updates an availability record
   *
   * @param req Express.Request
   * @param res Express.Response
   */
  // @ts-ignore
  static async apiUpdateAvailability(req, res): object {
    try {
      const updatedAvailability = await AvailabilityService.updateAvailability(
        req.body
      );
      res.json(updatedAvailability);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /**
   * Deletes an availability record
   *
   * @param req Express.Request
   * @param res Express.Response
   */
  // @ts-ignore
  static async apiDeleteAvailability(req, res): object {
    try {
      const deletedAvailability = await AvailabilityService.deleteAvailability(
        req.body
      );
      res.json(deletedAvailability);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default Availability;
